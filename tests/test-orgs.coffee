# Licensed under the Apache License. See footer for details.

expect = require("expect.js")

cfModels = require("..")
apiv2    = cfModels.v2

#-------------------------------------------------------------------------------
describe "orgs", ->

  #-----------------------------------------------------------------------------
  it "should return orgs", (done) ->
    apiv2.organizations()

    .then (items) ->
      expect(items).to.be.an "array"

      for item in items
        expect(item.metadata           ).to.be.a "object"
        expect(item.metadata.guid      ).to.be.a "string" if item.metadata.guid?
        expect(item.metadata.url       ).to.be.a "string" if item.metadata.url?
        expect(item.metadata.created_at).to.be.a "string" if item.metadata.created_a?
        expect(item.metadata.updated_at).to.be.a "string" if item.metadata.updated_a?

        expect(item.name        ).to.be.a "string" if item.name?
        expect(item.spaces_url  ).to.be.a "string" if item.spaces_url?
        expect(item.domains_url ).to.be.a "string" if item.domains_url?
        expect(item.users_url   ).to.be.a "string" if item.users_url?
        expect(item.managers_url).to.be.a "string" if item.managers_ur?
        expect(item.auditors_url).to.be.a "string" if item.auditors_ur?

        expect(item.spaces  ).to.be.a "function" if item.spaces_url?
        expect(item.domains ).to.be.a "function" if item.domains_url?
        expect(item.users   ).to.be.a "function" if item.users_url?
        expect(item.managers).to.be.a "function" if item.managers_ur?
        expect(item.auditors).to.be.a "function" if item.auditors_ur?

      done()

    .fail (err) -> done(err)
    .done()

  #-----------------------------------------------------------------------------
  it "should return org users", (done) ->
    apiv2.organizations()

    .then (orgs) ->
      orgs[0].users()

    .then (users) ->
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
