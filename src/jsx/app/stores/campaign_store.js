'use strict';

var Reflux = require('reflux');
var ActionCreators = require('../actions/campaign_actions');

var CampaignStore = Reflux.createStore({
  init: function () {
    this._campaign = {};
    this._campaigns = [];
    this.listenTo(ActionCreators.getCampaign, this.onReceiveCampaign);
  },

  onReceiveCampaign: function (campaign) {
    console.log("onRecieveCampaign()");
    this._campaign = campaign;
    this.trigger();
  },

  getCampaign: function () {
    console.log("getCampaign()");
    console.log(this._campaign);
    return this._campaign;
  },

  updateCampaign: function (campaign) {

    this.trigger();
  },
});

module.exports = CampaignStore;
