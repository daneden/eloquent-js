// Use the reduce method in combination with the concat method
// to “flatten” an array of arrays into a single array that has
// all the elements of the input arrays.

let array = [[1,2,3], [4,5], [6]]


// I accidentally peeked the solution. Welp.
console.log(array.reduce((flat, current) => {
  return flat.concat(current)
}, []))
