/* ERROR PAGES */
var notfound = require('./routes/notfound.jsx');

/* APP PAGES */
var blank = require('./routes/app/blank.jsx');
var datatables = require('./routes/app/datatables.jsx');
var form_controls = require('./routes/app/form_controls.jsx');
var campaign = require('./routes/app/xeditable.jsx');

/* ROUTES */
module.exports = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={blank} />
    <Route path='/' handler={blank} />
    <NotFoundRoute handler={notfound} />
    <Route path='/app/tables/datatables' handler={datatables} />
    <Route path='/app/forms/controls' handler={form_controls} />
    <Route path='/app/forms/campaign' handler={campaign} />
  </Route>
);
