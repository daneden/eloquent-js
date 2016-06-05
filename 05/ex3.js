// Compute and output the average age of the people in the ancestry
// data set per century. A person is assigned to a century by taking
// their year of death, dividing it by 100, and rounding it up, as
// in Math.ceil(person.died / 100).

let ANCESTRY_FILE = require('./data.js')
let ancestry = JSON.parse(ANCESTRY_FILE)

let byName = {}
ancestry.forEach((person) => {
  byName[person.name] = person
})

const average = (array) => {
  const plus = (a, b) => a + b
  return array.reduce(plus) / array.length
}

let centuries = {}
ancestry.forEach((person) => {
  let century = Math.ceil(person.died / 100)

  if(centuries[century] === undefined) {
    centuries[century] = [person.died - person.born]
  } else {
    centuries[century].push(person.died - person.born)
  }
})

for(century in centuries) {
  console.log(`${century}:`, average(centuries[century]))
}
