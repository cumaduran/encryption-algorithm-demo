/** Text Cipher of Algorithm
 * @module lib/textcipher
 */
// Import numjs package for effective matrix operations
const njs = require('@0xcmdr/numjs')
// Import our image encryption algorithm
const alg = require('./algorithm')
/**
 * Encrpyt given text via our algorithm
 * @param {string} plain - Plain Text
 * @param {integer} round - Round
 * @return {string} Ciphered text
 */
function cipherText (plain, round) {
  // parse string to ascii
  const asc = stringToASC(plain)
  // Encrypt text using our algorithm
  const ciphered = alg.init(asc, 8)
  // Parse ciphered ASCII code text to string array and return
  return String.fromCharCode(...ciphered.flatten().tolist())
}

/**
 * Parse every character of given plain text to ASCII code array
 * @param {string} plain - Plain Text
 * @return {NdArray} Ciphered ASCII code array
 */
function stringToASC (plain) {
  // Empty array for charcodes
  const asc = njs.uint8(njs.zeros(plain.length))
  // Turns plaint text array to ASCII Code array
  for (let i = 0; i < plain.length; i++) {
    // Parse ASCII code of every character in plain text
    asc.set(i, plain.charCodeAt(i))
  }
  // return array
  return asc
}
module.exports = { cipherText }
