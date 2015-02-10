// Licensed under the Apache License. See footer for details.

"use strict";

require("./6to5-runtime");

var _ = require("underscore");

var curl = require("./curl");
var utils = require("./utils");
var models = require("./models-v2");

//------------------------------------------------------------------------------
exports.info = info;
exports.apps = apps;
exports.buildpacks = buildpacks;
exports.organizations = organizations;
exports.private_domains = private_domains;
exports.routes = routes;
exports.service_bindings = service_bindings;
exports.service_instances = service_instances;
exports.services = services;
exports.shared_domains = shared_domains;
exports.spaces = spaces;
exports.stacks = stacks;
exports.user_provided_service_instances = user_provided_service_instances;

//------------------------------------------------------------------------------
function info() {
  return curl.curl("/v2/info");
}

//------------------------------------------------------------------------------
function apps() {
  return models.getModels("/v2/apps");
}

//------------------------------------------------------------------------------
function buildpacks() {
  return models.getModels("/v2/buildpacks");
}

//------------------------------------------------------------------------------
function organizations() {
  return models.getModels("/v2/organizations");
}

//------------------------------------------------------------------------------
function private_domains() {
  return models.getModels("/v2/private_domains");
}

//------------------------------------------------------------------------------
function routes() {
  return models.getModels("/v2/routes");
}

//------------------------------------------------------------------------------
function service_bindings() {
  return models.getModels("/v2/service_bindings");
}

//------------------------------------------------------------------------------
function service_instances() {
  return models.getModels("/v2/service_instances");
}

//------------------------------------------------------------------------------
function services() {
  return models.getModels("/v2/services");
}

//------------------------------------------------------------------------------
function shared_domains() {
  return models.getModels("/v2/shared_domains");
}

//------------------------------------------------------------------------------
function spaces() {
  return models.getModels("/v2/spaces");
}

//------------------------------------------------------------------------------
function stacks() {
  return models.getModels("/v2/stacks");
}

//------------------------------------------------------------------------------
function user_provided_service_instances() {
  return models.getModels("/v2/user_provided_service_instances");
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