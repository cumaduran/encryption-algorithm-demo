const { fork } = require('child_process')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const multer = require('multer')
const txt = require('../lib/textcipher')
const config = require('../nuxt.config.js')
// database
const Sqllite = require('./Sqllite')
// initialize db
const mydb = new Sqllite('server/database/encrypt.db')
// initiliza express server
const app = express()
// Multer package for images upload to local storage
// Storage Settings
const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'static/uploads/images')
  },
  filename (req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname))
  }
})
// limit file size
const limits = {
  files: 1,
  fileSize: 500000
}
const fileFilter = function (req, file, cb) {
// supported image file mimetypes
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/tiff', 'image/webp']

  if (_.includes(allowedMimes, file.mimetype)) {
    // allow supported image files
    cb(null, true)
  } else {
    // throw error for invalid files
    cb(new Error('Invalid file type. Only jpg and png image files are allowed.'))
  }
}

// setup multer
const upload = multer({
  storage,
  limits,
  fileFilter
})

// For handling user uploading images
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// sunucuyu başlat
async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  // create tables
  /* mydb.tables({
    original: ['id INTEGER PRIMARY KEY,name TEXT UNIQUE,originalname TEXT,ext TEXT,mimetype TEXT,imageSize TEXT,round integer,method TEXT'],
    ciphered: ['id INTEGER PRIMARY KEY,name TEXT UNIQUE ,ext TEXT, height INTEGER,width INTEGER,channels INTEGER,pixels INTEGER,blocks INTEGER,second INTEGER,milisecond INTEGER,round INTEGER,method TEXT,parallel TEXT,cpu INTEGER']
  }) */
}
start()

// Fetch images which user uploaded
app.post('/cmd', function (req, res) {
  const up = upload.single('cipher')
  up(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).send({ error: 'Image file size can be maximum 500 KB' })
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).send({ error: 'Image file size can be maximum 500 KB' })
    } else {
      // Everything went fine.
      res.send(req.file)
      // Add image to database
      const ext = path.extname(req.file.originalname)
      mydb.insert('original', ['name,originalname,ext,mimetype,imagesize,round,method'],
        [path.basename(req.file.filename, ext), req.file.originalname, ext, req.file.mimetype, req.file.size, req.body.round, req.body.travel])
    }
  })
})

app.use('/cipher/image', function (req, res, next) {
  if (req.hostname === 'localhost' && req.body.filename) {
    next()
  } else {
    res.status(400).send()
  }
})

app.post('/cipher/image', function (req, res) {
  // Fork image and do cpu intensive process at isolated space
  const child = fork('lib/fork/forkimage.js')
  // fetch image from child process
  // filename
  const name = req.body.filename
  // eslint-disable-next-line no-unused-vars
  let details
  child.on('message', data => (this.details = data))

  // if process is done, return response to client
  child.on('exit', () => {
    // send respond to user
    res.json({ filename: name, ...this.details })
    // add data to database
    // get extension
    const ext = path.extname(name)
    mydb.insert('ciphered', ['name,ext,height,width,channels,pixels,blocks,second,milisecond,round,method,parallel,cpu'],
      [path.basename(name, ext), ext, this.details.height, this.details.width, this.details.channels, this.details.arrsize,
        this.details.ciphered[0], this.details.exec[0], this.details.exec[1], req.body.round, req.body.travel, 'No', 1])
  })
  // Send child to parameters
  child.send({ path: req.body.path, file: name, round: req.body.round, travel: req.body.travel })
})
// cipher text
app.post('/cipher/text', function (req, res, next) {
  // start timer
  const start = process.hrtime()
  const ciphered = txt.cipherText(req.body.plain, req.body.round)
  const end = process.hrtime(start)
  res.json({ cipher: ciphered, time: end })
})
// fetch all original images
app.get('/originals', function (req, res) {
  // open the database
  mydb.all('SELECT * FROM original', [], result => res.json(result))
})
// get specific ciphered image
app.get('/cipher/:id', function (req, res) {
  // open the database
  mydb.all('SELECT * FROM ciphered WHERE name=? ', [req.params.id], result => res.json(result))
})
// get specific original image
app.get('/original/:id', function (req, res) {
  // open the database
  mydb.all('SELECT * FROM original WHERE name=? ', [req.params.id], result => res.json(result))
})
