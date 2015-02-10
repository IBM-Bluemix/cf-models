// Licensed under the Apache License. See footer for details.

"use strict";

require("./6to5-runtime");

var Q = require("q");

var curl = require("./curl");

//------------------------------------------------------------------------------
exports.getModels = getModels;
exports.createModel = createModel;
exports.createModels = createModels;

//------------------------------------------------------------------------------
var Model =

//-----------------------------------
function Model(resource) {
  to5Runtime.classCallCheck(this, Model);

  this.metadata = {};

  for (var key in resource.metadata) {
    this.metadata[key] = resource.metadata[key];
  }

  for (var key in resource.entity) {
    this[key] = resource.entity[key];

    var match = undefined;

    match = key.match(/(.*)s_url$/);
    if (match) {
      this["" + match[1] + "s"] = getModelsMethod(this[key]);
      continue;
    }

    match = key.match(/(.*)_url$/);
    if (match) {
      this[match[1]] = getModelMethod(this[key]);
      continue;
    }
  }
};

//------------------------------------------------------------------------------
function getModelMethod(url) {
  return function () {
    var deferred = Q.defer();

    curl.curl(url).fail(function (err) {
      return deferred.reject(err);
    }).then(function (resource) {
      return deferred.resolve(createModel(resource));
    }).done();

    return deferred.promise;
  };
}

//------------------------------------------------------------------------------
function getModelsMethod(url) {
  return function () {
    var deferred = Q.defer();

    curl.curlPaged(url).fail(function (err) {
      return deferred.reject(err);
    }).then(function (resources) {
      return deferred.resolve(createModels(resources));
    }).done();

    return deferred.promise;
  };
}

//------------------------------------------------------------------------------
function getModels(uri) {
  var deferred = Q.defer();

  curl.curlPaged(uri).then(function (items) {
    return deferred.resolve(createModels(items));
  }).progress(function (percent) {
    return deferred.notify(percent);
  }).fail(function (err) {
    return deferred.reject(err);
  }).done();

  return deferred.promise;
}

//------------------------------------------------------------------------------
function createModel(resource) {
  if (null == resource) return null;

  return new Model(resource);
}

//------------------------------------------------------------------------------
function createModels(resources) {
  if (null == resources) return [];

  return resources.map(function (resource) {
    return createModel(resource);
  });
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