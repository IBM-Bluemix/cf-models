// Licensed under the Apache License. See footer for details.

"use strict"

const child_process = require("child_process")

const _     = require("underscore")
const debug = require("debug")

const utils   = require("./utils")
const command = require("./command")

let PageSize = 100

const DEBUG_CURL      = debug("cf-models:curl")
const DEBUG_CURL_DATA = debug("cf-models:curlData")

//------------------------------------------------------------------------------
exports.curl      = curl
exports.curlJSON  = curlJSON
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
// return response from GET'ing the specified uri
//------------------------------------------------------------------------------
function curl(uri) {
  let result = command.runCf(["curl", uri])

  if (result.status != 0) {
    throw new Error(`error curl'ing ${uri}: ${result.status}`)
  }

  return result.stdout
}

//------------------------------------------------------------------------------
// return response from GET'ing the specified uri as JSON object
//------------------------------------------------------------------------------
function curlJSON(uri) {
  return JSON.parse(curl(uri))
}

//------------------------------------------------------------------------------
// get paged resources
//------------------------------------------------------------------------------
function curlPaged(uri) {
  let pageSize  = PageSize
  let resources = []

  uri = `${uri}?results-per-page=${pageSize}`

  let result = curlJSON(uri)
  resources = resources.concat(result.resources)

  let page = 2
  while (resources.length < result.total_results) {
    let uriPage = `${uri}&page=${page}`

    result = curlJSON(uriPage)
    resources = resources.concat(result.resources)
    page++

  }

  return resources
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
