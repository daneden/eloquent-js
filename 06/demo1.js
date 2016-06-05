// Table-building program

// @params: rows:Array [[TextCell]]
const rowHeights = (rows) => {
  return rows.map((row) => {
    // row:Array [TextCell]
    return row.reduce((max, cell) => {
      return Math.max(max, cell.minHeight())
    }, 0)
  })
}

// @params: rows:Array [[TextCell]]
const colWidths = (rows) => {
  // Iterate over the columns of the first row
  return rows[0].map((_, i) => {
    // Array.reduce on rows (though we only need a column
    // count from the first row
    return rows.reduce((max, row) => {
      // row:Array [TextCell]
      return Math.max(max, row[i].minWidth())
    }, 0)
  })
}

const drawTable = (rows) => {
  // Create arrays of heights and widths for the rows/columns
  let heights = rowHeights(rows),
      widths  = colWidths(rows)

  // Capture the strings that should appear next to one another
  // and join them with a space
  const drawLine = (blocks, lineNo) => {
    return blocks.map((block) => {
      return block[lineNo]
    }).join(" ")
  }

  // Draw rows themselves
  const drawRow = (row, rowNum) => {
    // First, create an array of "blocks"; arrays of strings
    // representing the cells, split by line.
    let blocks = row.map((cell, colNum) => {
      return cell.draw(widths[colNum], heights[rowNum])
    })

    // Then, starting from the leftmost line, create a line from
    // all the blocks by line number
    return blocks[0].map((_, lineNo) => {
      return drawLine(blocks, lineNo)
    }).join("\n")
  }

  // Return the table
  return rows.map(drawRow).join("\n")
}

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

// Sample data
let MOUNTAINS = require('./data.js')


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

// Now, let's create the function for drawing the
// table from our data set
function dataTable(data) {
  let keys = Object.keys(data[0]),
      headers = keys.map((name) => {
        return new UnderlinedCell(new TextCell(name))
      })

  let body = data.map((row) => {
    return keys.map((name) => {
      let value = row[name]
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    })
  })
  return [headers].concat(body)
}

console.log(drawTable(dataTable(MOUNTAINS)))

// Here's a little modification to add getter/setter methods to TextCell:
// Using Object.defineProperty makes the property nonenumerable
Object.defineProperty(TextCell.prototype, "heightProp", {
  get: function() {
    return this.text.length
  }
})

let cell = new TextCell("no\nway")
console.log(cell.heightProp)

// When a getter but no setter is defined, writing
// to the property is simply ignored.
cell.heightProp = 100
console.log(cell.heightProp)

