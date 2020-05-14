/** Core Functipns of Image/Text Encryption Algorithm
* @module lib/algorithm
 */
// Import numjs package for effective matrix operations
const njs = require('@0xcmdr/numjs')
// Import my random array creator
const myrand = require('./myrandom')
// Import my aes-des functions library for shifting etc. Step 8-15
const aesDes = require('./desAes')

/**
 * Algorithm core(main) function, includes almost main all steps and flow
 * @param {NdArray} original - One dimensional various size array, it can be image or text
 * @param {integer} round - Number of round that user specified
 * @return {NdArray} Array of Ciphered Blocks
 **/
function init (original, round) {
// Step 3 & 4 : Divide elements block which contains 256 pixels / character and also called final ciphered image / text
  const blocks = divideBlocks(original)
  // Step 5 : Create IV
  let initVector = njs.uint8(myrand.integerArray(0, 256, 256))
  // Apply Steps 7-16 to each blocks
  for (let i = 0; i < blocks.shape[0]; i++) {
    // Fetch i'th block of blocks
    const cipheredBlock = blocks.pick(i, null)
    // Steps 7 : block XOR Init Vector
    blockXOR(cipheredBlock, initVector)
    // Apply Same Operation to Each block for every round
    for (let j = 0; j < round; j++) {
      // Generate random number between 1 and 32(excluded) and get shifted AES-SBox by rows
      const shiftRows = aesDes.shiftRows(myrand.randInteger(1, 32))
      // Ciphered Image Vector XOR shiftRows(before send flatten array to 1x256 size)
      blockXOR(cipheredBlock, shiftRows.flatten())
      // Generate Random Generated 1x256 array and XOR cipheredImage array
      blockXOR(cipheredBlock, njs.uint8(myrand.integerArray(0, 256, 256)))
      // Generate random number between 1 and 32(excluded) and get shifted AES-SBox by rows
      const shiftCols = aesDes.shiftCols(myrand.randInteger(1, 32))
      // Ciphered Image Vector XOR shiftCols(before send flatten array to 1x256 size)
      blockXOR(cipheredBlock, shiftCols.flatten())
      // Generate Random Generated 1x256 array and XOR cipheredImage array
      blockXOR(cipheredBlock, njs.uint8(myrand.integerArray(0, 256, 256)))
      // Calculate modulo of round
      const part = round % 4
      // Permutate subblock
      aesDes.desPermutation(cipheredBlock, part)
    }
    // Assign ciphered block to Initialization Vector
    initVector = cipheredBlock
  }
  // Return our one dimensional ciphered image or text
  return blocks
}

/**
 * Divide given image pixel array to 256 pixels blocks and padding blanks of last block with 0
 * @param {NdArray} arr - Given one dimensional image/text array
 * @return {NdArray} Array Blocks.
 */
function divideBlocks (arr) {
  // fetch array properties [columns]
  const props = arr.shape
  // store new array that named blocks. 2D Array,[number of block][blocks content]
  let blocks
  // if our array has remain from dividing 256 (props[0] means amount of columns)
  const remain = props[0] % 256
  if (remain > 0) {
    // calculate how many columns needed
    const amount = 256 - remain
    // push zeros of remain size at the end of array
    const temp = arr.tolist()
    // create random array 0-255 interval
    const random = myrand.integerArray(0, 256, amount)
    // create and reshape our block array
    blocks = njs.uint8(temp.concat(random)).reshape(((props[0] + amount) / 256), 256)
  } else {
    // if no remains, directly create and reshape array
    blocks = arr.reshape(props[0] / 256, 256)
  }
  // return blocks
  return blocks
}

/**
 * Divide given image pixel array to 256 pixels blocks and padding blanks of last block with 0
 * @param {NdArray} block - 256 pixels block of Image Array
 * @param {NdArray} initVector - Init Vector
 * @param {integer} size - Array Size
 */
function blockXOR (block, initVector, size = 256) {
  // Calculate exor
  for (let i = 0; i < size; i++) {
    // Set result to new array
    block.set(i, (block.get(i) ^ initVector.get(i)))
  }
}

// Exports functions
module.exports = { init, blockXOR }
