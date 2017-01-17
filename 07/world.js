// MARK: Helper functions
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function elementFromChar(legend, ch) {
  if (ch == " ")
    return null
  let element = new legend[ch]()
  element.originChar = ch
  return element
}

function charFromElement(element) {
  if(element == null)
    return " "
  return element.originChar
}

// MARK: World plan
let plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"]

// MARK: Vector object
function Vector(x, y) {
  this.x = x
  this.y = y
}

  Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }

// MARK: Grid object
function Grid(width, height) {
  this.space = new Array(width * height)
  this.width = width
  this.height = height
}

  Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height
  }

  Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y]
  }

  Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value
  }

  Grid.prototype.forEach = function(func, context) {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        let val = this.space[x + y * this.width]
        if (val != null)
          func.call(context, val, new Vector(x, y))
      }
    }
  }

// MARK: Grid test
let grid = new Grid(5, 5)
console.log(grid.get(new Vector(1, 1))) // -> undefined
grid.set(new Vector(1, 1), "X")
console.log(grid.get(new Vector(1, 1))) // -> X

// MARK: Critter directions
const directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1),
}

const directionNames = Object.keys(directions)


// MARK: Bouncing Critter
// This critter will follow its nose until it hits a wall,
// at which point it will pick a new direction
function BouncingCritter() {
  this.direction = randomElement(directionNames)
}

  BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ")
      this.direction = view.find(" ") | "s"
    return {type: "move", direction: this.direction}
  }

// MARK: World object
function World(map, legend) {
  let grid = new Grid(map[0].length, map.length)
  this.grid = grid
  this.legend = legend

  map.forEach((line, y) => {
    for(let x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]))
    }
  })
}

  World.prototype.toString = function() {
    let output = ''
    for (let y = 0; y < this.grid.height; y++) {
      for(let x = 0; x < this.grid.width; x++) {
        let element = this.grid.get(new Vector(x, y))
        output += charFromElement(element)
      }
      output += "\n"
    }

    return output
  }

  World.prototype.turn = function() {
    let acted = []
    this.grid.forEach(function(critter, vector) {
      if(critter.act && acted.indexOf(critter) == -1) {
        acted.push(critter)
        this.letAct(critter, vector)
      }
    }, this)
  }

  World.prototype.letAct = function(critter, vector) {
    let action = critter.act(new View(this, vector))
    if (action && action.type == 'move') {
      let dest = this.checkDestination(action, vector)
      if (dest && this.grid.get(dest) == null) {
        this.grid.set(vector, null)
        this.grid.set(dest, critter)
      }
    }
  }

  World.prototype.checkDestination = function(action, vector) {
    if(directions.hasOwnProperty(action.direction)) {
      let dest = vector.plus(directions[action.direction])
      if(this.grid.isInside(dest))
        return dest
    }
  }

// MARK: Wall object
function Wall() {}

// MARK: set up the world
let world = new World(plan, {
  "#": Wall,
  "o": BouncingCritter
})

console.log(world.toString())

// MARK: View object
function View(world, vector) {
  this.world = world
  this.vector = vector
}

  View.prototype.look = function(dir) {
    let target = this.vector.plus(dir)
    if (this.world.grid.isInside(target))
      return charFromElement(this.world.grid.get(target))
    else
      return "#"
  }

  View.prototype.findAll = function(ch) {
    let found = []
    for (let dir in directions)
      if (this.look(dir) == ch)
        found.push(dir)
    return found
  }

  View.prototype.find = function(ch) {
    let found = this.findAll(ch)
    if(found.length == 0) return null
    return randomElement(found)
  }

// MARK: let there be life!
for(let i = 0; i < 5; i++) {
  world.turn()
  console.log(world.toString())
}
