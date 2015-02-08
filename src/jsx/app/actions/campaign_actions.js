'use strict';

var Reflux = require('reflux');
var WebAPIUtils = require('../utils/api_utils');

var ActionCreators = exports;

ActionCreators.getCampaign = Reflux.createAction();
ActionCreators.updateCampaign = Reflux.createAction();
