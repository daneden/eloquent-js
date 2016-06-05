// Higher-order functions

// Functions can return functions
const greaterThan = (n) => {
  return (m) => m > n
}

let greaterThanTen = greaterThan(10)

console.log(greaterThanTen(11))
console.log(greaterThanTen(9))

// Functions can change other functions
const noisy = (f) => {
  return (arg) => {
    console.log("calling with", arg)
    let val = f(arg)
    console.log("called with", arg, "- got", val)
    return val
  }
}

noisy(Boolean)(0)

// Functions can change control flow
const unless = (test, then) => {
  if (!test) then()
}

const repeat = (times, body) => {
  for(let i = 0; i < times; i++) body(i);
}

repeat(7, (n) => {
  unless(n % 2, () => {
    console.log(n, "is even")
  })
})
