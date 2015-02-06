// Licensed under the Apache License. See footer for details.

"use strict";

require("./6to5-runtime");

var _ = require("underscore");

var curl = require("./curl");
var utils = require("./utils");
var v = "./v2";

//------------------------------------------------------------------------------
exports.info = require("" + v + "/info").info;
exports.orgs = require("" + v + "/orgs").orgs

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
;