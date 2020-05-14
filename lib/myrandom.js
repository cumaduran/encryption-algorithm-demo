/**
 * Generate random number between given min and max values
 * and return array with filling random numbers
@module lib/myrandom */

/**
 * Create random integer between min and max (max excludes)
 * @params {integer}  min - Minimum number
 * @params {integer}  max - Maximum number
 * */
function randInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Create random one dimensional integer array between min and max (max excludes)
 * @params {integer}  min - Minimum number
 * @params {integer}  max - Maximum number
 * @params {integer}  size - Size of array
 * @return {array} Random Integer Array
 */
function integerArray (min, max, size) {
  // Create empty array
  const random = []
  // Fill array
  for (let i = 0; i < size; i++) {
    random[i] = randInteger(min, max)
  }
  // return random one dimensional array
  return random
}

module.exports = { randInteger, integerArray }
