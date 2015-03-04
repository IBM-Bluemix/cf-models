"use strict"

let iterable = {}

//------------------------------------------------------------------------------
iterable[Symbol.iterator] = function() {
  let iterator = {}

  let step = 0
  iterator.next = function() {
    step++

    switch (step) {
      case 1:  return { value: 'hello' }
      case 2:  return { value: 'world' }
      default: return { done: true }
    }
  }

  return iterator
}

//------------------------------------------------------------------------------
for (let x of iterable) {
  console.log(x)
}
