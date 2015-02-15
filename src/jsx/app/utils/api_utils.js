'use strict';
var request = require('superagent');
var ActionCreators = require("../actions/campaign_actions");
var apiSource = "http://localhost:4000/api";

module.exports = {
  getOne: function (id, resource) {
    console.log("Getting: " + id);

    request.get(apiSource + "/" + resource + "/" + id, function (res) {
      console.log(res.body);
      ActionCreators.getCampaign(res.body);
    });
  },

  get: function (resource) {
    console.log("Getting: " + resource);

    request.get(apiSource + "/" + resource, function (res) {
      console.log(res.body);
      ActionCreators.getCampaigns(res.body);
    });
  },

  put: function (id, resource, content) {
    console.log("Updating: " + id);

    delete content.id;

    request
      .put(apiSource + "/" + resource + "/" + id)
      .send(content)
      .end(onResponse);

    function onResponse(err, res) {
      ActionCreators.updateCampaign(res.body);
    }
  }
};
