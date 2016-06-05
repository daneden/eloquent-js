const everyOrSome = (array, action, returnOnSome) => {
  let matches = 0;

  for(let i = 0; i < array.length; i++) {
    matches += action(array[i]) ? 1 : 0
  }

  if(!returnOnSome)
    return matches == (array.length);
  else
    return matches > 0;
}

const every = (array, action) => everyOrSome(array, action)
const some = (array, action) => everyOrSome(array, action, true)

console.log(every([NaN, NaN, NaN], isNaN))
console.log(every([NaN, NaN, 4], isNaN))
console.log(some([NaN, 3, 4], isNaN))
console.log(some([2, 3, 4], isNaN))

// Book solutions:
function bookEvery(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (!predicate(array[i]))
      return false;
  }
  return true;
}

function bookSome(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i]))
      return true;
  }
  return false;
}

