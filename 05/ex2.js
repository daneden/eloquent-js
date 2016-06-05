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

// Filter function to remove those without mothers in the data set
const hasKnownMother = (person) => {
  return byName[person.mother] ? true : false
}

let averageAgeOfMothers = average(
    ancestry.filter(hasKnownMother)
      .map((person) => person.born - byName[person.mother].born)
    )

console.log(averageAgeOfMothers)

// Book solution:
var differences = ancestry.filter(function(person) {
  return byName[person.mother] != null;
}).map(function(person) {
  return person.born - byName[person.mother].born;
});
