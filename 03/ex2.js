// We’ve seen that % (the remainder operator) can be used to test
// whether a number is even or odd by using % 2 to check whether
// it’s divisible by two. Here’s another way to define whether a
// positive whole number is even or odd:
//
// - Zero is even.
// - One is odd.
// - For any other number N, its evenness is the same as N - 2.
//
// Define a recursive function isEven corresponding to this
// description. The function should accept a number parameter and
// return a Boolean.

const isEven = (num) => {
  switch (num) {
    case 0:
      return true
      break
    case 1:
      return false
      break
    default:
      return num > 0 ? isEven(num-2) : isEven(num+2)
      break
  }
}

console.log(isEven(50))
console.log(isEven(75))
console.log(isEven(-1))

// Book solution:
function bookIsEven(n) {
  if (n == 0)
    return true;
  else if (n == 1)
    return false;
  else if (n < 0)
    return isEven(-n);
  else
    return isEven(n - 2);
}
