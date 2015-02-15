'use strict';

var Reflux = require('reflux');
var ActionCreators = require('../actions/campaign_actions');
var API = require('../utils/api_utils');


var CampaignStore = Reflux.createStore({
  init: function () {
    this._campaign = {};
    this._campaigns = [];
    this.listenTo(ActionCreators.getCampaign, this.onReceiveCampaign);
    this.listenTo(ActionCreators.getCampaigns, this.onReceiveCampaigns);
    this.listenTo(ActionCreators.updateCampaign, this.onReceiveCampaign);
  },

  onReceiveCampaign: function (campaign) {
    console.log("onRecieveCampaign()");
    this._campaign = campaign;
    this.trigger();
  },

  onReceiveCampaigns: function (campaigns) {
    console.log("onRecieveCampaigns()");
    this._campaigns = campaigns;
    this.trigger();
  },

  getCampaign: function () {
    console.log("getCampaign()");
    console.log(this._campaign);
    return this._campaign;
  },

  getCampaigns: function () {
    console.log("getCampaigns()");
    console.log(this._campaigns);
    return this._campaigns;
  },

  updateCampaign: function (campaign) {
    console.log("updateCampaign()");
    API.put("54d82b4ed878b913a1c9cc1d", "campaigns", campaign);

    this.trigger();
  },
});

module.exports = CampaignStore;
