// Write a range function that takes two arguments, start and
// end, and returns an array containing all the numbers from
// start up to (and including) end.

// Next, write a sum function that takes an array of numbers
// and returns the sum of these numbers. Run the previous
// program and see whether it does indeed return 55.

const range = (start, end, step) => {
  if(step === undefined) step = 1;
  let arr = []
  if(step > 0) {
    for(let i = start; i <= end; i += step)
      arr.push(i);
  } else {
    for(let i = start; i >= end; i += step)
      arr.push(i);
  }

  return arr
}

console.log("range(1,10)", range(1,10))
console.log("range(1,10,2)", range(1,10,2))
console.log("range(5,2,-1)", range(5,2,-1))

const sum = (nums) => {
  let total = 0
  for(let i = 0; i < nums.length; i++)
    total += nums[i];

  return total
}

console.log("sum(range(1,10))", sum(range(1,10)))

// Book solutions:
// identical
