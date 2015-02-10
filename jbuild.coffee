# Licensed under the Apache License. See footer for details.

path = require "path"

pkg = require("./package.json")

six2five = global["6to5"]

#-------------------------------------------------------------------------------
tasks = defineTasks exports,
  watch: "watch for source file changes, build, test"
  build: "run a build"
  test:  "run tests"

WatchSpec = "*.ts lib-src lib-src/**/* tests tests/**/*"

#-------------------------------------------------------------------------------
mkdir "-p", "tmp"

#-------------------------------------------------------------------------------
tasks.build = ->
  # syntaxCheckTypeScript "cf-models-def.ts"

  #log "linting ..."
  # jshint "lib-src/*.js"

  log "6to5 ..."

  mkdir "-p",       "lib"
  chmod "-R", "+w", "lib"
  rm    "-Rf",      "lib/*"
  mkdir "-p",       "lib"

  six2five "lib-src --out-dir lib --runtime"

  log "6to5 runtime ..."
  {code, output} = exec "node_modules/.bin/6to5-runtime", {silent: true}
  if code isnt 0
    log "error running 6to5-runtime"
    exit()

  output.to "lib/6to5-runtime.js"

  chmod "-R", "-w", "lib/*"

#-------------------------------------------------------------------------------
tasks.watch = ->
  watchIter()

  watch
    files: WatchSpec.split " "
    run:   watchIter

  watchFiles "jbuild.coffee" :->
    log "jbuild file changed; exiting"
    process.exit 0

#-------------------------------------------------------------------------------
tasks.test = ->
  log "running tests ..."

  # run node tests
  tests = "tests/test-*.coffee"

  options =
    ui:         "bdd"
    reporter:   "spec"
    slow:       300
    compilers:  "coffee:coffee-script"
    require:    "coffee-script/register"

  options = for key, val of options
    "--#{key} #{val}"

  options = options.join " "

  mocha "#{options} #{tests}"

#-------------------------------------------------------------------------------
syntaxCheckTypeScript = (file) ->
  log "syntax checking: #{file} ..."
  tsc "--outDir tmp --module commonjs #{file}"

#-------------------------------------------------------------------------------
watchIter = ->
  log "in #{path.relative "../..", __dirname}"

  tasks.build()
  tasks.test()

#-------------------------------------------------------------------------------
cleanDir = (dir) ->
  mkdir "-p", dir
  rm "-rf", "#{dir}/*"

#-------------------------------------------------------------------------------
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------
