// Licensed under the Apache License. See footer for details.

"use strict"

const spawn = require("child_process").spawn

const _     = require("underscore")
const debug = require("debug")

const utils = require("./utils")

let PageSize = 100

const DEBUG_CURL      = debug("cf-models:curl")
const DEBUG_CURL_DATA = debug("cf-models:curlData")

//------------------------------------------------------------------------------
exports.curl      = curl
exports.curlPaged = curlPaged
exports.pageSize  = pageSize

//------------------------------------------------------------------------------
function pageSize(newValue) {
  if (newValue !== null) {
    PageSize = newValue
  }

  return PageSize
}

//------------------------------------------------------------------------------
// issue request to uri, assuming JSON response, return promise
//------------------------------------------------------------------------------
function curl(uri) {
  return utils.runCfCommand(["curl", uri])
}

//------------------------------------------------------------------------------
// get paged resources
//------------------------------------------------------------------------------
function curlPaged(uri) {
  let deferred = utils.defer()

  // results-per-page
  // page
  uri = `${uri}?results-per-page=${PageSize}`

  curl(uri)

  .then(function(result) {
    gotPage(deferred, uri, result, [], 1)
  })

  .catch(function(err) {
    deferred.reject(err)
  })

  return deferred.promise
}

//------------------------------------------------------------------------------
function gotPage(deferred, uri, result, resources, page) {
  resources = resources.concat(result.resources)

  if (resources.length >= result.total_results) {
    deferred.notify(1)
    deferred.resolve(resources)
    return
  }

  deferred.notify(resources.length / result.total_results)

  let url = `${uri}&page=${page+1}`

  curl(url)

  .then(function(result) {
    gotPage(deferred, uri, result, resources, page+1)
  })

  .catch(function(err) {
    deferred.reject(error)
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
