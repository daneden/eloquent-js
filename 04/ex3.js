// arrayToList([10,20])
// -> {value: 10, rest: {value: 20, rest: null}}
const arrayToList = (array) => {
  return {
    value: array[0],
    rest: array[1] == null ? null : arrayToList(array.slice(1))
  }
}

console.log(arrayToList([10,20]))

const listToArray = (list) => {
  let output = []
  for(var node = list; node; node = node.rest)
    output.push(node.value);
  return output
}

console.log(listToArray(arrayToList([10,20,30])))

const prepend = (val, list) => {
  return {
    value: val,
    rest: list || null
  }
}

console.log(prepend(10, prepend(20, null)))

const nth = (list, n) => {
  if(!list) {
    return undefined
  } else if(n == 0) {
    return list.value
  } else {
    return nth(list.rest, n - 1)
  }
}

console.log(nth(arrayToList([10,20,30]), 1))
