// Write a program that creates a string that represents
// an 8×8 grid, using newline characters to separate lines.
// At each position of the grid there is either a space or
// a “#” character. The characters should form a chess board.

let makeGrid = (size) => {
  let output = ""

  for(var n = 0; n < size; n++) {
    let variance = n % 2 ? "# " : " #"
    for(var i = 0; i < size; i+=2) {
      output += variance
    }
    output += "\n"
  }

  console.log(output)
}

makeGrid(8)

// Book solution:
var size = 8;
var board = "";

for (var y = 0; y < size; y++) {
  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      board += " ";
    else
      board += "#";
  }
  board += "\n";
}

console.log(board);
