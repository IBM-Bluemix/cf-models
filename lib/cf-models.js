// Licensed under the Apache License. See footer for details.

"use strict"

const child_process = require("child_process")

const debug = require("debug")

const curl    = require("./curl")
const v2API   = require("./cf-models-v2")
const utils   = require("./utils")
const command = require("./command")

//------------------------------------------------------------------------------
exports.version   = utils.VERSION
exports.v2        = v2API
exports.cfVersion = cfVersion
exports.pageSize  = curl.pageSize

//------------------------------------------------------------------------------
function cfVersion() {
  let result = utils.runCfCommand(["--version"])

  if (result.status != 0) {
    throw new Error(`error getting cf version: ${result.status}`)
  }

  let version = parseVersionString(result.stdout)

  if (!version) {
    throw new Error(`unable to parse version: '${result.stdout}'`)
  }

  return version
}

//------------------------------------------------------------------------------
function parseVersionString(string) {
  let match = string.match(/.*(\d+)\.(\d+)\.(.*)\n$/)

  if (!match) return null

  return {
    full: `${match[1]}.${match[2]}.${match[3]}`,
    major: match[1],
    minor: match[2],
    build: match[3],
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
