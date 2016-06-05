let ANCESTRY_FILE = require('./data.js')
let ancestry = JSON.parse(ANCESTRY_FILE)

let byName = {}
ancestry.forEach((person) => {
  byName[person.name] = person
})

console.log(byName['Philibert Haverbeke'])

const reduceAncestors = (person, f, defaultValue) => {
  const valueFor = (person) => {
    if(person == null) {
      return defaultValue
    } else {
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]))
    }
  }

  return valueFor(person)
}

const sharedDNA = (person, fromMother, fromFather) => {
  if(person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2
}

let ph = byName[ "Philibert Haverbeke" ]

console.log(reduceAncestors(ph, sharedDNA, 0) / 4)
