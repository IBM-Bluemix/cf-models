// Licensed under the Apache License. See footer for details.

"use strict"

const _ = require("underscore")

const cfModels = require("..")
const apiv2    = cfModels.v2

//------------------------------------------------------------------------------
module.exports = tester

//------------------------------------------------------------------------------
function tester(t) {

  //-----------------------------------
  t.test("should be able to get orgs", function(t) {
    apiv2.organizations()
    .then(check)
    .catch(getEnder(t))

    //---------------------------------
    function check(items) {
      t.end()
    }
  })
}
//      t.ok(_.isArray(items), "items should be an array"
//
//      for item in items
//        expect(item.metadata           ).to.be.a "object"
//        expect(item.metadata.guid      ).to.be.a "string" if item.metadata.guid?
//        expect(item.metadata.url       ).to.be.a "string" if item.metadata.url?
//        expect(item.metadata.created_at).to.be.a "string" if item.metadata.created_a?
//        expect(item.metadata.updated_at).to.be.a "string" if item.metadata.updated_a?
//
//        expect(item.name        ).to.be.a "string" if item.name?
//        expect(item.spaces_url  ).to.be.a "string" if item.spaces_url?
//        expect(item.domains_url ).to.be.a "string" if item.domains_url?
//        expect(item.users_url   ).to.be.a "string" if item.users_url?
//        expect(item.managers_url).to.be.a "string" if item.managers_ur?
//        expect(item.auditors_url).to.be.a "string" if item.auditors_ur?
//
//        expect(item.spaces  ).to.be.a "function" if item.spaces_url?
//        expect(item.domains ).to.be.a "function" if item.domains_url?
//        expect(item.users   ).to.be.a "function" if item.users_url?
//        expect(item.managers).to.be.a "function" if item.managers_ur?
//        expect(item.auditors).to.be.a "function" if item.auditors_ur?



//  //----------------------------------------------------------------------------
//  it "should return org users", (done) ->
//    apiv2.organizations()
//
//    .then (orgs) ->
//      orgs[0].users()
//
//    .then (users) ->
//      done()
//
//    .fail (err) -> done(err)
//    .done()

//------------------------------------------------------------------------------
function getEnder(t) {
  return function(err) {
    t.end(err)
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
