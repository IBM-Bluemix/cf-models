"use strict"

//------------------------------------------------------------------------------
function run(generatorFunction) {
  var generatorItr = generatorFunction(function(callbackValue) {
    generatorItr.next(callbackValue)
  })

  generatorItr.next()
}

//------------------------------------------------------------------------------
function delay(time, callback) {
  setTimeout(function () { callback(time)}, time)
}

//------------------------------------------------------------------------------
function elapsed(dateStart) {
  return Math.round((Date.now() - dateStart)/1000)
}

//------------------------------------------------------------------------------
run(function*(resume) {
  var result
  var dateStart = Date.now()

  result = yield delay(1000, resume)
  console.log(`delayed for ${result} seconds; elapsed: ${elapsed(dateStart)}`)

  result = yield delay(2000, resume)
  console.log(`delayed for ${result} seconds; elapsed: ${elapsed(dateStart)}`)

  result = yield delay(1000, resume)
  console.log(`delayed for ${result} seconds; elapsed: ${elapsed(dateStart)}`)

})
