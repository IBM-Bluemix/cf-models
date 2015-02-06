// Licensed under the Apache License. See footer for details.

"use strict";

require("./6to5-runtime");

var spawn = require("child_process").spawn;

var _ = require("underscore");
var Q = require("Q");

var utils = require("./utils");

//------------------------------------------------------------------------------
module.exports = curl;

//------------------------------------------------------------------------------
// issue request to uri, assuming JSON response, return promise
//------------------------------------------------------------------------------
function curl(uri) {
  var deferred = Q.defer();

  var cmd = "cf";
  var args = ["curl", uri];

  var process = spawn(cmd, args);
  var stdout = [];
  var stderr = [];

  process.stdout.on("data", function (data) {
    return stdout.push(data);
  });
  process.stderr.on("data", function (data) {
    return stderr.push(data);
  });
  process.on("close", handleClose);

  return deferred.promise;

  //-----------------------------------
  function handleClose(code) {
    stdout = stdout.join("");
    stderr = stderr.join("");

    // console.log(`code: ${code}`)
    // console.log(`stdout: \n${stdout}`)
    // console.log(`stderr: \n${stderr}`)

    if (code == 0) {
      try {
        stdout = JSON.parse(stdout);
        deferred.resolve(stdout);
      } catch (error) {
        error.code = "JSON";
        error.stdout = stdout;
        error.stderr = stderr;
        deferred.reject(error);
      }
      return;
    }

    var error = new Error("error in cf curl");
    error.code = code;
    error.stdout = stdout;
    error.stderr = stderr;

    deferred.reject(error);
  }
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