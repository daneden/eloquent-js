// We're used to these kinds of loops
let array = [1, 2, 3, 4]

for(let i = 0; i < array.length; i++) {
  console.log(array[i])
}

// But we can abstract it:
let logArray = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

logArray(array)

// What if we want to do more than console.log?
let forEach = (arr, action) => {
  for(let i = 0; i < arr.length; i++) {
    action(arr[i])
  }
}

forEach(["Wampeter", "Foma", "Granfalloon"], console.log)

// We can also create anonymous functions:
let sum = 0
// forEach([1, 2, 3, 4, 5], function(num){
//   sum+=num;
// })
forEach([1, 2, 3, 4, 5], (num) => sum+=num)
console.log(sum)


