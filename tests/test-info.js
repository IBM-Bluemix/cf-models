// Licensed under the Apache License. See footer for details.

"use strict"

const _ = require("underscore")

const cfModels = require("..")
const apiv2    = cfModels.v2

//------------------------------------------------------------------------------
module.exports = tester

//------------------------------------------------------------------------------
function tester(t) {

  //-----------------------------------
  t.test("- should be able to get info", function(t) {

    let info = apiv2.info()

    t.ok(_.isObject(info                       ), "info                        should be a object")
    t.ok(_.isString(info.name                  ), "info.name                   should be a string")
    t.ok(_.isString(info.build                 ), "info.build                  should be a string")
    t.ok(_.isString(info.support               ), "info.support                should be a string")
    t.ok(_.isString(info.api_version           ), "info.api_version            should be a string")
    t.ok(_.isString(info.authorization_endpoint), "info.authorization_endpoint should be a string")
    t.ok(_.isString(info.token_endpoint        ), "info.token_endpoint         should be a string")
    t.ok(_.isString(info.logging_endpoint      ), "info.logging_endpoint       should be a string")
    t.ok(_.isNumber(info.version               ), "info.version                should be a number")
    t.ok(_.isString(info.description           ), "info.description            should be a string")

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
