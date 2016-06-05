const deepEqual = (a, b) => {
  if((typeof(a) == "object" && a != null) &&
      (typeof(b) == "object" && b != null)) {
    for(key in a) {
      return deepEqual(a[key], b[key])
    }
  } else {
    return a === b
  }
}

let obj = {here: {is: "an"}, object: 2}

console.log(deepEqual(obj, obj))
console.log(deepEqual(1,1))
console.log(deepEqual(obj, {here: 1, object: 2}))
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}))
console.log(deepEqual(obj, {here: {is: "poop"}, object: 2}))
console.log(deepEqual(obj, {here: {is: "poop"}}))

// Book solutions:
function bookDeepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
    return false;

  var propsInA = 0, propsInB = 0;

  for (var prop in a)
    propsInA += 1;

  for (var prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }

  return propsInA == propsInB;
}

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
