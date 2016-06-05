let ANCESTRY_FILE = require('./data.js')
let ancestry = JSON.parse(ANCESTRY_FILE)

console.log("Ancestry array length:", ancestry.length)

const filter = (array, test) => {
  let passed = []
  for(let i = 0; i < array.length; i++) {
    if(test(array[i]))
      passed.push(array[i]);
  }

  return passed
}

console.log("Implemented Array.filter:",
    filter(ancestry, (person) => {
  return person.born > 1900 && person.born < 1925
}))

// Like forEach, filter is also a standard method on arrays.
// The example defined the function only in order to show what
// it does internally. From now on, we’ll use it like this instead:

console.log("Native Array.filter:",
    ancestry.filter((person) => { /* function/test body */}))

// Implementing Array.map
const map = (array, transform) => {
  let mapped = []
  for(let i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));

  return mapped
}

let overNinety = ancestry.filter((person) => person.died - person.born > 90)

console.log("Implemented Array.map:",
    map(overNinety, (person) => person.name))

// Implementing Array.reduce
const reduce = (array, combine, start) => {
  let current = start
  for(let i = 0; i < array.length; i++)
    current = combine(current, array[i]);

  return current
}

console.log("Implemented Array.reduce:",
    reduce([1,2,3,4], (a, b) => a + b, 0))

console.log("Native Array.reduce:",
    ancestry.reduce((min, cur) => {
      if(cur.born < min.born) return cur;
      else return min;
    }))
