"use strict"

//------------------------------------------------------------------------------
function makeIterable(getNext) {
  let iterable = {}
  let iterator = {}

  let fn = getNext()

  iterable[Symbol.iterator] = function() { return this }
  iterable.next             = fn

  return iterable
}

//------------------------------------------------------------------------------
let iterable = makeIterable(function() {
  let step = 0

  return function next() {
    step++

    switch (step) {
      case 1:  return { value: 'hello' }
      case 2:  return { value: 'world' }
      default: return { done: true }
    }
  }
})

//------------------------------------------------------------------------------
for (let x of iterable) {
  console.log(x)
}
