# Licensed under the Apache License. See footer for details.

Q      = require "q"
expect = require("expect.js")

cfModels = require("..")
apiv2    = cfModels.v2

#-------------------------------------------------------------------------------
describe "app", ->

  #-----------------------------------------------------------------------------
  it "should handle an app", (done) ->
    @timeout 20000

    app = null
    obj = null

    apiv2.apps()
    .then (items) ->
      expect(items).to.be.an "array"
      app = items[0]

      obj = {
        name:                  app.name,
        memory:                app.memory,
        instances:             app.instances,
        disk_quota:            app.disk_quota,
        created_at:            app.metadata.created_at,
        updated_at:            app.metadata.updated_at,
        detected_buildpack:    app.detected_buildpack,
        state:                 app.state,
        version:               app.version,
        staging_failed_reason: app.staging_failed_reason,
        environment_json:      app.environment_json,
      }

      app.space()

    .then (space) ->
      obj.space = space.name

      space.organization()

    .then (organization) ->
      obj.organization = organization.name

      app.service_bindings()

    .then (service_bindings) ->

      obj.services = service_bindings.map (service_binding) ->
        { credentials: service_binding.credentials }

      service_instances = service_bindings.map (service_binding) ->
        service_binding.service_instance()

      Q.all(service_instances)

    .then (service_instances) ->
      if service_instances.length
        for i in [0 .. service_instances.length - 1]
          obj.services[i].name = service_instances[i].name

      app.routes()

    .then (routes) ->
      obj.routes = routes.map (route) -> route.host

      domains = routes.map (route) ->
        route.domain()

      Q.all(domains)

    .then (domains) ->

      for i in [0 .. domains.length - 1]
        obj.routes[i] = obj.routes[i] + "." + domains[i].name

      console.log "app: #{obj.name}"
      console.log "  organization:           #{obj.organization}"
      console.log "  space:                  #{obj.space}"
      console.log "  memory:                 #{obj.memory}"
      console.log "  instances:              #{obj.instances}"
      console.log "  disk_quota:             #{obj.disk_quota}"
      console.log "  created:                #{obj.created_at}"
      console.log "  updated:                #{obj.updated_at}"
      console.log "  detected_buildpack:     #{obj.detected_buildpack}"
      console.log "  state:                  #{obj.state}"
      console.log "  version:                #{obj.version}"
      console.log "  staging_failed_reason:  #{obj.staging_failed_reason}"
      console.log "  services:"

      for service in obj.services
        console.log "    #{service.name}"

      console.log "  routes:"

      for route in obj.routes
        console.log "    #{route}"

      console.log "  environment:            #{JSON.stringify(obj.environment_json, null, 4)}"

      done()

    .fail (err) ->
      done(err)
      console.log "error: #{err}"
      console.log "  uri:  #{err.uri}"
      console.log "  code: #{err.code}"
      console.log "  stdout:"
      console.log err.stdout
      console.log "  stderr:"
      console.log err.stderr
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
