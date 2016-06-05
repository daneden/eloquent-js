let pile = {
  elements: ["eggshell", "orange peel", "worm"],
  get height() {
    return this.elements.length
  },
  set height(value) {
    console.log("Ignoring attempt to set height to", value)
  }
}

console.log(pile.height)
pile.height = 100
