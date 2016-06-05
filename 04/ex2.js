// Arrays have a method reverse, which changes the array by
// inverting the order in which its elements appear. For this
// exercise, write two functions, reverseArray and
// reverseArrayInPlace. The first, reverseArray, takes an array
// as argument and produces a new array that has the same
// elements in the inverse order. The second, reverseArrayInPlace,
// does what the reverse method does: it modifies the array given
// as argument in order to reverse its elements. Neither may use
// the standard reverse method.

// Needed to reveal the hints to get this working. Misunderstood
// the usage for Array.unshift
const reverseArray = (array) => {
  let newArray = []
  for(let i = 0; i < array.length; i++) {
    newArray.unshift(array[i])
  }

  return newArray
}

console.log(reverseArray(["a", "b", "c"]))

const reverseArrayInPlace = (array) => {
  for(let i = 0; i < Math.floor(array.length / 2); i++) {
    let val = array[i]
    array[i] = array[array.length - 1 - i]
    array[array.length - 1 - i] = val
  }

  return array
}

let arrayValue = [1,2,3,4,5]
reverseArrayInPlace(arrayValue)
console.log(arrayValue)
