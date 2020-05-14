/** Matrix Traversal Functions
 * @module lib/myTraversal
 */
// Find minimum in given two params
function min (a, b) {
  if (a > b) { return b } else { return a }
}
// Find minimum in given three params
function min3 (a, b, c) {
  const x = min(a, b)
  if (x > c) { return c } else { return x }
}
// Find maximum in given two params
function max (a, b) {
  if (a > b) { return a } else { return b }
}

/**
 * Transform array to myTraversal form and return one dimensional flatten array
 @params {integer} rows : Number of Rows of Given Array
 @params {integer} cols : Number of Columns of Given Array
 @params {string} type : Selected traversal method
 @params {array} arr : Given Array
 */
function flatArray (rows, cols, arr, type) {
  if (type === 'zigzag') {
    return zigzag(rows, cols, arr)
  }
}

/**
 * Transform array to ZIGZAG(Diagonal) form and return one dimensional flatten array
 @params {integer} dims : Number of Dimensions of Given Array
 @params {integer} rows : Number of Rows of Given Array
 @params {integer} cols : Number of Columns of Given Array
 @params {array} arr : Given Array
 */
function zigzag (rows, cols, arr) {
  // Define final result array
  const result = []
  /* Traversal array with diagonal algorithm */
  for (let i = 1; i <= (rows + cols - 1); i++) {
    /* Get column index of the first element in this line of output.
    The index is 0 for first ROW lines and line - ROW for remaining
    lines  */
    const startCol = max(0, i - rows)

    /* Get count of elements in this line. The count of elements is
       equal to minimum of line number, COL-start_col and ROW */
    const count = min3(i, (cols - startCol), rows)

    /* Push Elements to result array */
    for (let j = 0; j < count; j++) {
      result.push(arr[min(rows, i) - j - 1][startCol + j])
    }
  }
  // Return 1 x rows*cols array
  return result
}

module.exports = { flatArray }
