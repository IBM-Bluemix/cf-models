// Licensed under the Apache License. See footer for details.

"use strict"

const cfModels = require("./lib/cf-models")
const api      = cfModels.v2

let orgs = api.organizations()

for (let org of orgs) {
  console.log("")
  console.log(`org: ${org.name}`)
  for (let space of org.spaces()) {
    console.log("")
    console.log(`  space: ${space.name}`)
    for (let app of space.apps()) {
      console.log(`    app: ${app.name}`)
    }
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
