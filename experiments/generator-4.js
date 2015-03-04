"use strict"

let fs = require("fs")

//------------------------------------------------------------------------------
function runYieldedCB(generator) {
  let iterator = generator(cb)
  iterator.next()

  function cb(err, data) {
    iterator.next({err: err, data: data})
  }
}

//------------------------------------------------------------------------------
function setTimeoutCB(time, cb) {
  setTimeout(function(){cb(null, time)}, time)
}

//------------------------------------------------------------------------------
function printFileResult(result) {
  if (result.err) return console.log(`  file err: ${result.err}`)
  console.log(`  file len: ${result.data.length}`)
}

//------------------------------------------------------------------------------
function runOnce(cbOuter) {
  console.log("in runOnce()")

  runYieldedCB(function*(cb) {
    let result

    result = yield fs.readFile(__filename, {encoding: "utf8"}, cb)
    printFileResult(result)

    result = yield fs.readFile(__filename + "x", {encoding: "utf8"}, cb)
    printFileResult(result)

    result = yield setTimeoutCB(1000, cb)
    console.log("  timeout:", result)

    result = yield fs.readFile(__filename, {encoding: "utf8"}, cb)
    printFileResult(result)

    cbOuter()
  })
}

//------------------------------------------------------------------------------
runYieldedCB(function*(cb) {
  yield runOnce(cb)
  yield runOnce(cb)
})
