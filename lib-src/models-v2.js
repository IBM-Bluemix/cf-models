// Licensed under the Apache License. See footer for details.

"use strict"

require("./6to5-runtime")

const Q = require("q")

const curl = require("./curl")

//------------------------------------------------------------------------------
exports.getModels    = getModels
exports.createModel  = createModel
exports.createModels = createModels

//------------------------------------------------------------------------------
class Model {

  //-----------------------------------
  constructor(resource) {
    this.metadata = {}

    for (let key in resource.metadata) {
      this.metadata[key] = resource.metadata[key]
    }

    for (let key in resource.entity) {
      this[key] = resource.entity[key]

      let match

      match = key.match(/(.*)s_url$/)
      if (match) {
        this[`${match[1]}s`] = getModelsMethod(this[key])
        continue
      }

      match = key.match(/(.*)_url$/)
      if (match) {
        this[match[1]] = getModelMethod(this[key])
        continue
      }
    }
  }

}

//------------------------------------------------------------------------------
function getModelMethod(url) {
  return function() {
    let deferred = Q.defer()

    curl.curl(url)
    .fail (err      => deferred.reject(err))
    .then (resource => deferred.resolve(createModel(resource)))
    .done()

    return deferred.promise
  }
}

//------------------------------------------------------------------------------
function getModelsMethod(url) {
  return function() {
    let deferred = Q.defer()

    curl.curlPaged(url)
    .fail (err       => deferred.reject(err))
    .then (resources => deferred.resolve(createModels(resources)))
    .done()

    return deferred.promise
  }
}

//------------------------------------------------------------------------------
function getModels(uri) {
  let deferred = Q.defer()

  curl.curlPaged(uri)
  .then(     items   => deferred.resolve(createModels(items)) )
  .progress( percent => deferred.notify(percent) )
  .fail(     err     => deferred.reject(err) )
  .done()

  return deferred.promise
}

//------------------------------------------------------------------------------
function createModel(resource) {
  if (null == resource) return null

  return new Model(resource)
}

//------------------------------------------------------------------------------
function createModels(resources) {
  if (null == resources) return []

  return resources.map(resource => createModel(resource))
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
