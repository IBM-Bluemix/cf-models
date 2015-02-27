// Licensed under the Apache License. See footer for details.

"use strict"

const _ = require("underscore")

const utils = require("../lib/utils")

//------------------------------------------------------------------------------
module.exports = tester

//------------------------------------------------------------------------------
function tester(t) {

  //----------------------------------------------------------------------------
  t.test("deferred should be structurally sound", function(t) {
    let deferred = utils.defer()

    t.ok(deferred,         "defer() should return an object")
    t.ok(deferred.promise, "defer().promise should be an object")
    t.ok(_.isFunction(deferred.resolve), "defer().resolve should be a function")
    t.ok(_.isFunction(deferred.reject),  "defer().reject should be a function")

    t.end()
  })

  //----------------------------------------------------------------------------
  t.test("deferred should be resolve correctly", function(t) {
    let deferred = utils.defer()
    let promise  = deferred.promise
    let val      = {}

    promise.then(resolved).catch(rejected)

    deferred.resolve(val)

    //---------------------------------
    function resolved(valResolved) {
      t.equal(valResolved, val, `unexpected resolved value ${val}`)
      t.end()
    }

    //---------------------------------
    function rejected(err) {
      t.fail(`unexpected rejection #{err}`)
      t.end()
    }
  })

  //----------------------------------------------------------------------------
  t.test("deferred should be reject correctly", function(t) {
    let deferred = utils.defer()
    let promise  = deferred.promise
    let val      = new Error("test")

    promise.then(resolved).catch(rejected)

    deferred.reject(val)

    //---------------------------------
    function resolved(val) {
      t.fail(`unexpected resolve: {val}`)
      t.end()
    }

    //---------------------------------
    function rejected(err) {
      t.equal(err, val, `unexpected rejection value ${err}`)
      t.end()
    }
  })


}

//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
