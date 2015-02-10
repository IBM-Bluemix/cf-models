# Licensed under the Apache License. See footer for details.

expect = require("expect.js")

cfModels = require("..")
apiv2    = cfModels.v2

#-------------------------------------------------------------------------------
describe "info", ->

  #-----------------------------------------------------------------------------
  it "should return info object", (done) ->
    apiv2.info()

    .then (info) ->
      expect(info                       ).to.be.a "object"
      expect(info.name                  ).to.be.a "string"
      expect(info.build                 ).to.be.a "string"
      expect(info.support               ).to.be.a "string"
      expect(info.api_version           ).to.be.a "string"
      expect(info.authorization_endpoint).to.be.a "string"
      expect(info.token_endpoint        ).to.be.a "string"
      expect(info.logging_endpoint      ).to.be.a "string"
      expect(info.version               ).to.be.a "number"
      expect(info.description           ).to.be.a "string"
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
