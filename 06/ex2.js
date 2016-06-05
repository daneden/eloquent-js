const repeat = (string, times) => {
  let result = ""
  for(let i = 0; i < times; i++)
    result += string;
  return result
}

function TextCell(text) {
  this.text = text.split("\n")
}

TextCell.prototype.minWidth = function() {
  // Iterate over every line and check its length
  // against the current longest length
  return this.text.reduce((width, line) => {
    return Math.max(width, line.length)
  }, 0)
}

TextCell.prototype.minHeight = function() {
  // this.text is an array, so to get the height,
  // we just need to count the items
  return this.text.length
}

TextCell.prototype.draw = function(width, height) {
  let result = []

  for(let i = 0; i < height; i++) {
    // result will be an array of lines derived from this.text
    let line = this.text[i] || ""
    // Use the repeat function to pad the end of the string
    result.push(line + repeat(" ", width - line.length))
  }

  return result
}

// Create an object/class for underlined cells
// with a single parameter - a TextCell (inner)
function UnderlinedCell(inner) {
  this.inner = inner
}

UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth()
}

UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1
}

UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)])
}

// Now we can create a different kind of TextCell that
// right-aligns its value
function RTextCell(text) {
  TextCell.call(this, text)
}

RTextCell.prototype = Object.create(TextCell.prototype)
RTextCell.prototype.draw = function(width, height) {
  let result = []
  for(let i = 0; i < height; i++) {
    let line = this.text[i] || ""
    result.push(repeat(" ", width - line.length) + line)
  }
  return result
}

// Exercise: Stretch Cell
function StretchCell(inner, width, height) {
  this.inner = inner
  this.width = width
  this.height = height
}

StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth())
}

StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight())
}

StretchCell.prototype.draw = function(w, h) {
  return this.inner.draw(w, h)
}

let sc = new StretchCell(new TextCell("abc"), 1, 2)
console.log(sc.minWidth())
console.log(sc.minHeight())
console.log(sc.draw(3, 2))
