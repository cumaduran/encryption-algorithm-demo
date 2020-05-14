/** Image Cipher of Algorithm
 * @module lib/imagecipher
 */
// Import numjs package for effective matrix operations
const njs = require('@0xcmdr/numjs')
// Import our image encryption algorithm
const alg = require('./algorithm')
// Import myTraversal lib for diagonal etc. traversal
const traversal = require('./myTraversal')

/**
 * Step 1 & 2: Read Image and turn into one dimensional array with zigzag etc. traversal
 * @param {string} path - Path of image which want to be encrypt
 * @param {string} filename - Real name of image
 * @param {number} round - Number of round
 * @param {string} traversal - User specified array traversal method
 * @return {object} - Some informational datas for user
 * */
function cipherImage (path, filename, round = 8, traversal) {
  // Read image from path and store at uint8 array
  const img = njs.images.read(path)
  // img.shape return [rows,columns,channels]
  const props = img.shape
  // Transform array to one dimensional array
  const oneDim = flatImage(img, props, traversal)
  // Encrypt Image !
  const cipheredImage = alg.init(oneDim, round)
  // reshape image to original image shape (rows,cols,channels)
  saveImage(cipheredImage, img.size, props, filename)
  // return some informational datas to user
  /*  let channel = props[2]
  if (props[2] === undefined) {
    channel = 1
  } */
  return { height: props[0], width: props[1], channels: props[2], arrsize: img.size, ciphered: cipheredImage.shape }
}
/**
 * Step 1 & 2: Read Image and turn into one dimensional array with zigzag etc. traversal
 * @param {string} ciphered - Path of image which want to be encrypt
 * @param {integer} size - Real name of image
 * @param {array} props - Properties of original image array
 * @param {string} filename - File name of image
 * @return {Map}
 * */
function saveImage (ciphered, size, props, filename) {
  // if image has RGB channels
  if (props[2]) {
    // How many pixels will remove
    const modulo = size % 256
    // if image has been padded before
    if (modulo > 0) {
      const amount = 256 - (modulo)
      // De-padding(remove extra items where located end of the array)
      const cipheredImage = (ciphered.flatten().slice([0, (ciphered.size - amount)]))
      // Reshape array original dimension and save to disk
      njs.images.save(cipheredImage.reshape(props[0], props[1], props[2]), 'static/uploads/ciphered/' + filename)
    } else {
      // Reshape array original dimension and save to disk
      njs.images.save(ciphered.reshape(props[0], props[1], props[2]), 'static/uploads/ciphered/' + filename)
    }
  } else {
    // Reshape array original dimension and save to disk
    njs.images.save(ciphered.reshape(props[0], props[1]), 'static/uploads/ciphered/' + filename)
  }
}

/**
 * Read the image from given path and transform to one dimensional array via selected traversal
 * @param {NdArray} img - Opened image array
 * @param {NdArray} props - Properties of Image such as number of rows, columns, channels
 * @param {string} travel- User selected matrix traversal method
 * @return {NdArray} One dimensional array of image
 * */
function flatImage (img, props, travel) {
  let oneDimension = []
  // If image dimension > 2, image is RGBA or RGB
  if (img.ndim > 2) {
    // Extract channels(dimensions) from array (props[2] hold how many channel we have)
    for (let dim = 0; dim < props[2]; dim++) {
      // Push each result to oneDimension array
      oneDimension.push(traversal.flatArray(props[0], props[1], img.pick(null, null, dim).tolist(), travel))
    }
    // img.shape return [dimension,rows,columns]
  } else {
    // Else image is Gray Scale Image
    oneDimension = traversal.flatArray(props[0], props[1], img.tolist(), travel)
  }
  // Cast and return one dimensional numjs array
  return njs.uint8(oneDimension).flatten()
}

module.exports = { cipherImage }
