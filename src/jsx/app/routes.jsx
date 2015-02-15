/* ERROR PAGES */
var notfound = require('./routes/notfound.jsx');

/* APP PAGES */
var blank = require('./routes/app/blank.jsx');
var form_controls = require('./routes/app/form_controls.jsx');
var campaign = require('./routes/app/campaign.jsx');
var campaigns = require('./routes/app/campaigns.jsx');

/* ROUTES */
module.exports = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={blank} />
    <Route path='/' handler={blank} />
    <NotFoundRoute handler={notfound} />
    <Route path='/app/campaigns' handler={campaigns} />
    <Route path='/app/forms/controls' handler={form_controls} />
    <Route path='/app/campaigns/:campaignId' handler={campaign} />
  </Route>
);
