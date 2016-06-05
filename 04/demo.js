const JOURNAL = require('./04_data.js')

const hasEvent = (event, entry) => {
  return entry.events.indexOf(event) != -1
}

const tableFor = (event, journal) => {
  let table = [0, 0, 0, 0]
  for(let i = 0; i < journal.length; i++) {
    let entry = journal[i],
        index = 0

    if(hasEvent(event, entry)) index+=1;
    if(entry.squirrel) index+=2;
    table[index] += 1
  }

  return table
}

console.log(tableFor("pizza", JOURNAL))
