const buffer = require('buffer').Buffer
const { SHA3 } = require('sha3')
/** CKG Function of Algorithm
 * @module lib/ckg
 */
class Ckg {
  constructor () {
    // create entropy pool
    this.entropyPool = []
    // An array to output for sha3 algorithm
    this.bitarray = ''
  }

  // sine map function
  sineMap (initial = 0.45, control = 0.99, numberofbits = 256) {
    // Generate as many bits as the number of bits the user gives
    for (let i = 0; i < numberofbits; i++) {
      // sine map
      let next = (control * (Math.sin((Math.PI * initial))))
      // apply threshold
      next = this.threshold(next)
      // add entropy pool
      this.entropyPool.push(next)
    }
    return this
  }

  // logistic map function
  logisticmap (initial = 0.85, control = 4, numberofbits = 256) {
    // Generate as many bits as the number of bits the user gives
    for (let i = 0; i < numberofbits; i++) {
      // logistic map function
      let next = (control * initial * (1 - initial))
      // apply threshold
      next = this.threshold(next)
      // add entropy pool
      this.entropyPool.push(next)
    }
    return this
  }

  // threshold function
  threshold (x) {
    if (x < 0.5) { return 0 } else { return 1 }
  }

  sha3 () {
    const hash = SHA3(256)
    hash.update(buffer.from(this.entropyPool, 'binary'))
    const res = hash.digest()
    res.map(val => (this.bitArray += ('00000000' + val.toString(2)).slice(-8)))
  }
}
module.exports = new Ckg()

const mysha3 = new Ckg().sineMap()
mysha3.sha3()
