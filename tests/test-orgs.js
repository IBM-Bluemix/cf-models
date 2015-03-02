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
  t.test("- should be able to get orgs", function(t) {
    let items = apiv2.organizations()

    t.ok(_.isArray(items), "items should be an array")

    for (let item of items) {
      t.ok(_.isObject(item.metadata),            "item.metadata   should be an object")
      t.ok(_.isString(item.metadata.guid      ), "item.guid       should be a string")
      t.ok(_.isString(item.metadata.url       ), "item.url        should be a string")
      t.ok(_.isString(item.metadata.created_at), "item.created_at should be a string")
      t.ok(_.isString(item.metadata.updated_at), "item.updated_at should be a string")

      t.ok(_.isString(item.name        ), "item.name         should be a string")
      t.ok(_.isString(item.spaces_url  ), "item.spaces_url   should be a string")
      t.ok(_.isString(item.domains_url ), "item.domains_url  should be a string")
      t.ok(_.isString(item.users_url   ), "item.users_url    should be a string")
      t.ok(_.isString(item.managers_url), "item.managers_url should be a string")
      t.ok(_.isString(item.auditors_url), "item.auditors_url should be a string")

      t.ok(_.isFunction(item.spaces  ), "item.spaces   should be a function")
      t.ok(_.isFunction(item.domains ), "item.domains  should be a function")
      t.ok(_.isFunction(item.users   ), "item.users    should be a function")
      t.ok(_.isFunction(item.managers), "item.managers should be a function")
      t.ok(_.isFunction(item.auditors), "item.auditors should be a function")
    }

    t.end()
  })
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
