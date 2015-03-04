"use strict"

//------------------------------------------------------------------------------
function delay(time, callback) {
  setTimeout(function () {
    callback("Slept for "+time)
  }, time)
}

//------------------------------------------------------------------------------
function run(generatorFunction) {
  var generatorItr = generatorFunction(function(callbackValue) {
    generatorItr.next(callbackValue)
  })

  generatorItr.next()
}

//------------------------------------------------------------------------------
run(function*(resume) {
    console.log(yield delay(1000, resume))
    console.log(yield delay(2000, resume))
    console.log(yield delay(3000, resume))
})
