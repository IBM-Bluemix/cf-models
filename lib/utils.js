// Licensed under the Apache License. See footer for details.

"use strict"

const child_process = require("child_process")

const debug = require("debug")

const pkg = require("../package.json")

exports.NAME    = pkg.name
exports.VERSION = pkg.version

exports.defer           = defer
exports.runCommand      = runCommand
exports.runCfCommand    = runCfCommand
exports.callOnce        = callOnce
exports.JS              = JS
exports.JL              = JL

const DEBUG_CMD = debug("cf-models:cmd")

let CommandID = 0

//------------------------------------------------------------------------------
function defer() {
  let deferred = {}

  deferred.promise = new Promise(function(resolver, rejecter) {
    deferred.resolve = resolver
    deferred.reject  = rejecter
  })

  return deferred
}

//------------------------------------------------------------------------------
// runs a command, returns a promise on {
//   code:   Number
//   signal: String
//   stdout: String
//   stderr: String
// }
//
//------------------------------------------------------------------------------
function runCommand(cmd, args) {
  CommandID++

  let commandID = CommandID
  let deferred  = defer()

  let stdout  = []
  let stderr  = []

  DEBUG_CMD(`spawn:   ${commandID} ${cmd} ${args.join(" ")}`)
  let process = child_process.spawn(cmd, args)

  process.on("exit",  handleExit)
  process.on("error", handleError)
  process.stdout.on("data", function(data) { stdout.push(data) })
  process.stderr.on("data", function(data) { stderr.push(data) })

  return deferred.promise

  //-----------------------------------
  function handleError(err) {
    DEBUG_CMD(`reject:  ${commandID} ${err}`)
    deferred.reject(err)
  }

  //-----------------------------------
  function handleExit(code, signal) {
    DEBUG_CMD(`resolve: ${commandID} ${code} ${signal}`)

    let result = {}

    result.code   = code
    result.signal = signal
    result.stdout = stdout.join("")
    result.stderr = stderr.join("")

    deferred.resolve(result)
  }
}

//------------------------------------------------------------------------------
function runCfCommand(args) {
  return runCommand("cf", args)
}


//------------------------------------------------------------------------------
function callOnce(fn) {
  let called = false

  return calledOnceShim

  //-----------------------------------
  function calledOnceShim() {
    if (called) return
    called = true

    fn.apply(this, arguments)
  }
}

//------------------------------------------------------------------------------
function JS(object) { return JSON.stringify(object) }
function JL(object) { return JSON.stringify(object, null, 4) }

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
