// Licensed under the Apache License. See footer for details.

"use strict"

require("./6to5-runtime")

const spawn = require("child_process").spawn

const Q = require("q")

const v2API = require("./cf-models-v2")
const utils = require("./utils")
const curl  = require("./curl")

//------------------------------------------------------------------------------
exports.version   = utils.VERSION
exports.v2        = v2API
exports.cfVersion = cfVersion
exports.pageSize  = curl.pageSize

//------------------------------------------------------------------------------
function cfVersion() {
  let deferred = Q.defer()

  let cmd  = "cf"
  let args = ["--version"]

  let process = spawn(cmd, args)
  let stdout  = []
  let stderr  = []

  process.stdout.on("data", (data) => stdout.push(data))
  process.stderr.on("data", (data) => stderr.push(data))
  process.on("close", handleClose)

  return deferred.promise

  //-----------------------------------
  function handleClose(code) {
    stdout = stdout.join("")
    stderr = stderr.join("")

    if (code == 0) {
      deferred.resolve(parseVersionString(stdout))
      return
    }

    let error = new Error("error in cf --version")
    error.code   = code
    error.stdout = stdout
    error.stderr = stderr

    deferred.reject(error)
  }
}

//------------------------------------------------------------------------------
function parseVersionString(string) {
  let match = string.match(/.*(\d+)\.(\d+)\.(.*)\n$/)

  if (!match) return {
    full: string
  }

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
