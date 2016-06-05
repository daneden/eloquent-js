/*
 * Write a loop that makes seven calls to console.log to output the following triangle:
 *
 * #
 * ##
 * ###
 * ####
 * #####
 * ######
 * #######
 *
 */

let makeTriangle = (size) => {
  for(var i = 0; i <= size; i++) {
    var n = i,
        output = ""
    while(n) {
      output += "#"
      n--
    }

    console.log(output)
  }
}

console.log("My solution: ")
makeTriangle(7)

// Exercise solution:
console.log("\nBook solution: ")
for (var line = "#"; line.length < 8; line += "#")
  console.log(line);

// Refactored:
var altMakeTriangle = (size) => {
  for (var line = "#"; line.length <= size; line += "#")
    console.log(line);
}

console.log("\nMy refactoring of book solution: ")
altMakeTriangle(7)
