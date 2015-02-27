// Licensed under the Apache License. See footer for details.

"use strict"

const _ = require("underscore")

const cfModels = require("..")
const apiv2    = cfModels.v2

//------------------------------------------------------------------------------
module.exports = tester

//------------------------------------------------------------------------------
function tester(t) {

  //----------------------------------------------------------------------------
  t.test("version should be a semver", function(t) {
    let match = cfModels.version.match(/^\d+\.\d+\.\d+(.*)$/)

    t.ok(match, "cfModels.version not acceptable: ${cfModels.version}")
    t.end()
  })

  //----------------------------------------------------------------------------
  t.test("should export object `v2`", function(t) {
    t.ok(apiv2, "cfModels.v2 should be a thing")
    t.end()
  })

  //----------------------------------------------------------------------------
  t.test("should export function `v2.info`", function(t) {
    t.ok(_.isFunction(apiv2.info), "cfModels.v2.info should be a function")
    t.end()
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
