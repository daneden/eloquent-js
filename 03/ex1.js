// The previous chapter introduced the standard function Math.min
// that returns its smallest argument. We can do that ourselves now.
// Write a function min that takes two arguments and returns their minimum.

const min = (a, b) => {
  return a > b ? b : a
}

console.log(min(10, 0))
console.log(min(-10, 0))
console.log(min(5,4))

// Book solution:
function bookMin(a, b) {
  if (a < b)
    return a;
  else
    return b;
}
