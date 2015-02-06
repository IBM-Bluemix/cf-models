// Licensed under the Apache License. See footer for details.

"use strict";

require("./6to5-runtime");

var pkg = require("../package.json");

exports.NAME = pkg.name;
exports.VERSION = pkg.version;

exports.callOnce = callOnce;
exports.JS = JS;
exports.JL = JL;

//------------------------------------------------------------------------------
function callOnce(fn) {
  var called = false;

  return calledOnceShim;

  //-----------------------------------
  function calledOnceShim() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (called) return;
    called = true;

    fn.apply(this, args);
  }
}

//------------------------------------------------------------------------------
function JS(object) {
  return JSON.stringify(object);
}
function JL(object) {
  return JSON.stringify(object, null, 4);
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