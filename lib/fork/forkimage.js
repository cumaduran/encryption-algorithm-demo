/** Image Encryption on Child Process
 * @module lib/fork/forkimage
 */

// import image cipher library for encrypting images
const img = require('../imagecipher')
// if parent process send message to child process
process.on('message', (data) => {
  // if message is not empty
  if (data.path) {
    // start timer and encrpyt image
    const start = process.hrtime()
    const detail = img.cipherImage(data.path, data.file, parseInt(data.round), data.travel)
    const end = process.hrtime(start)
    // add execution time to details object
    detail.exec = end
    // send details to parent process
    process.send(detail)
  }
  // kill child process
  process.kill(process.pid)
})
