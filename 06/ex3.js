function Sequence(vals) {
  this.vals = vals
}

Sequence.prototype.iterate = function(times, func) {
  for(let i = 0; i < times || i < this.vals.length; i++) {
    func(this.vals[i])
  }
}

function logFive(seq) {
  console.log(seq)
  if(seq instanceof Sequence)
    seq.iterate(5, console.log);
  else
    console.log("Expected type Sequence and got", typeof(seq))
}

function ArraySeq(vals) {
  Sequence.call(this, vals)
  this.prototype = Sequence.prototype
}

function RangeSeq(start, end) {
  let vals = []
  for(let i = start; i < end; i++) {
    vals.push(i)
  }

  Sequence.call(this, vals)
}

logFive(new ArraySeq([1,2]))
