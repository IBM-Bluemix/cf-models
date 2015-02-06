# Licensed under the Apache License. See footer for details.

expect = require("expect.js")

cfModels = require("..")
utils    = require("../lib/utils")

#-------------------------------------------------------------------------------
describe "cf version", ->

  #-----------------------------------------------------------------------------
  it "should return a version object", (done) ->
    cfModels.cfVersion()

    .then (version) ->
      expect(version).to.be.a "object"

      major = parseInt version.major
      minor = parseInt version.minor

      expect(major).to.be.a "number"
      expect(minor).to.be.a "number"

      expect(version.full ).to.be.a "string"
      expect(version.build).to.be.a "string"
      done()

    .fail (err) -> done(err)
    .done()

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
