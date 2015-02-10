// Licensed under the Apache License. See footer for details.

"use strict";

require("./6to5-runtime");

var spawn = require("child_process").spawn;

var _ = require("underscore");
var Q = require("q");

var utils = require("./utils");

var PageSize = 100;

var debugCurl = utils.debug("curl");
var debugCurlData = utils.debug("curlData");

//------------------------------------------------------------------------------
exports.curl = curl;
exports.curlPaged = curlPaged;
exports.pageSize = pageSize;

//------------------------------------------------------------------------------
function pageSize() {
  var newValue = arguments[0] === undefined ? null : arguments[0];
  if (newValue !== null) {
    PageSize = newValue;
  }

  return PageSize;
}

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

  debugCurl(uri);

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
        if (stdout.match(/.*Endpoint deprecated\n$/)) stdout = stdout.replace(/.*Endpoint deprecated\n$/, "");
        stdout = JSON.parse(stdout);
        deferred.resolve(stdout);
        debugCurlData(stdout);
      } catch (error) {
        error.uri = uri;
        error.code = "JSON";
        error.stdout = stdout;
        error.stderr = stderr;
        deferred.reject(error);
        debugCurlData("json error: " + error);
      }
      return;
    }

    var error = new Error("error in cf curl");
    error.uri = code;
    error.code = code;
    error.stdout = stdout;
    error.stderr = stderr;

    deferred.reject(error);
    debugCurlData("stderr: " + stderr);
  }
}

//------------------------------------------------------------------------------
// get paged resources
//------------------------------------------------------------------------------
function curlPaged(uri) {
  var deferred = Q.defer();

  // results-per-page
  // page
  uri = "" + uri + "?results-per-page=" + PageSize;

  curl(uri).then(function (result) {
    gotPage(deferred, uri, result, [], 1);
  }).fail(function (err) {
    deferred.reject(err);
  }).done();

  deferred.notify(0);

  return deferred.promise;
}

//------------------------------------------------------------------------------
function gotPage(deferred, uri, result, resources, page) {
  resources = resources.concat(result.resources);

  if (resources.length >= result.total_results) {
    deferred.notify(1);
    deferred.resolve(resources);
    return;
  }

  deferred.notify(resources.length / result.total_results);

  var url = "" + uri + "&page=" + (page + 1);

  curl(url).then(function (result) {
    gotPage(deferred, uri, result, resources, page + 1);
  }).fail(function (err) {
    deferred.reject(error);
  }).done();
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