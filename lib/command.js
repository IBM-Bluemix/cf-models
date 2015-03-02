// Licensed under the Apache License. See footer for details.

"use strict"

const child_process = require("child_process")

const debug = require("debug")

exports.run   = runCommand
exports.runCf = runCfCommand

const DEBUG = debug("cf-models:command")

//------------------------------------------------------------------------------
// runs a command, returns {
//   status: Number
//   signal: String
//   stdout: String
//   stderr: String
// }
//
//------------------------------------------------------------------------------
function runCommand(cmd, args) {
  let stdout  = []
  let stderr  = []

  if (DEBUG.enabled) DEBUG(`spawn: ${cmd} ${args.join(" ")}`)

  let opts = {
    encoding: "utf8"
  }

  let result = child_process.spawnSync(cmd, args, opts)

  if (result.error) throw result.error

  return result
}

//------------------------------------------------------------------------------
function runCfCommand(args) {
  return runCommand("cf", args)
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
