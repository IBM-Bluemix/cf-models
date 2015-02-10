# Licensed under the Apache License. See footer for details.

expect = require("expect.js")

cfModels = require("..")
apiv2    = cfModels.v2

#-------------------------------------------------------------------------------
describe "apps", ->

  #-----------------------------------------------------------------------------
  it "should return apps", (done) ->

    apiv2.apps()
    .then (items) ->
      expect(items).to.be.an "array"

      for item in items
        expect(item.metadata           ).to.be.a "object"
        expect(item.metadata.guid      ).to.be.a "string" if item.metadata.guid?
        expect(item.metadata.url       ).to.be.a "string" if item.metadata.url?
        expect(item.metadata.created_at).to.be.a "string" if item.metadata.created_a?
        expect(item.metadata.updated_at).to.be.a "string" if item.metadata.updated_a?

        expect(item.memory).to.be.a     "number"
        expect(item.instances).to.be.a  "number"
        expect(item.disk_quota).to.be.a "number"

        expect(item.name                  ).to.be.a "string" if item.name?
        expect(item.space_guid            ).to.be.a "string" if item.space_guid?
        expect(item.stack_guid            ).to.be.a "string" if item.stack_guid?
        expect(item.buildpack             ).to.be.a "string" if item.buildpack?
        expect(item.detected_buildpack    ).to.be.a "string" if item.detected_buildpack?
        expect(item.environment_json      ).to.be.a "object" if item.environment_json?
        expect(item.state                 ).to.be.a "string" if item.state?
        expect(item.version               ).to.be.a "string" if item.version?
        expect(item.command               ).to.be.a "string" if item.command?
        expect(item.staging_task_id       ).to.be.a "string" if item.staging_task_id?
        expect(item.package_state         ).to.be.a "string" if item.package_state?
        expect(item.health_check_type     ).to.be.a "string" if item.health_check_type?
        expect(item.health_check_timeout  ).to.be.a "string" if item.health_check_timeout?
        expect(item.staging_failed_reason ).to.be.a "string" if item.staging_failed_reason?
        expect(item.package_updated_at    ).to.be.a "string" if item.package_updated_at?
        expect(item.detected_start_command).to.be.a "string" if item.detected_start_comman?
        expect(item.space_url             ).to.be.a "string" if item.space_url?
        expect(item.stack_url             ).to.be.a "string" if item.stack_url?
        expect(item.events_url            ).to.be.a "string" if item.events_url?
        expect(item.service_bindings_url  ).to.be.a "string" if item.service_bindings_url?
        expect(item.routes_url            ).to.be.a "string" if item.routes_url?

      done()

    .fail (err) -> done(err)
    .done()

  #-----------------------------------------------------------------------------
  it "should handle paging", (done) ->
    @timeout 20000

    oldPageSize = cfModels.pageSize()
    cfModels.pageSize 10

    appCount = 0

    apiv2.apps()

    .then (items) ->
      appCount = items.length

      cfModels.pageSize oldPageSize

      apiv2.apps()

    .then (items) ->
      expect(appCount).to.be items.length
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
