var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Reflux = require('reflux');

// STORE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// some variables and helpers for our fake database stuff
var RenderCounter = 0,
    localStorageKey = "renders";

function getItemByKey(list,itemKey){
    return _.find(list, function(item) {
        return item.key === itemKey;
    });
}

// ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

RenderActions = Reflux.createActions([
    "addItem",        // called by hitting enter in field in TodoHeader
    "removeItem",     // called by button in TodoItem
    "editItem"        // called by finishing edit in TodoItem
]);

console.log("................................");
console.log(RenderActions);
console.log("................................");

renderListStore = Reflux.createStore({
  // this will set up listeners to all publishers in RenderActions, using onKeyname (or keyname) as callbacks
  listenables: [RenderActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return [];
  }
});


// JSX ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var Body = React.createClass({
  mixins: [Reflux.connect(renderListStore, "renders")],
  statics: {
    counter: 0,
    getCounter: function() {
      return 'counter-' + ++Body.counter;
    }
  },
  loadTable: function () {
    $('#example')
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  },

  // Get initial state from stores
  componentDidMount: function () {
    var self = this;

    $.get("http://localhost:4000/api/renders", function (res) {
      if (self.isMounted()) {
        console.log("``````````````ajax````````````````````");
        console.log(res);
        console.log(Body.getCounter());
        console.log("``````````````ajax````````````````````");

        return self.setState({ renders: res, refresh: Body.getCounter() }, self.loadTable);
      }
    });

  },
  render: function() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(this.state.renders);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer>
                <Panel>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <Table id='example' className='display' cellSpacing='0' width='100%'>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Campaign ID</th>
                                <th>Content</th>
                                <th>Created</th>
                                <th>Origin</th>
                                <th>Queue</th>
                                <th>State</th>
                                <th>Stats</th>
                                <th>Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              { this.state.renders.map(function (render) {
                                return (
                                  <tr>
                                    <td>{render.id}</td>
                                    <td>{render.campaignId}</td>
                                    <td>{render.content.text.full_name}</td>
                                    <td>{render.created_at}</td>
                                    <td>{render.origin}</td>
                                    <td>{render.queue}</td>
                                    <td>{render.queue}</td>
                                    <td>{render.queue}</td>
                                    <td>{render.type}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </Table>
                          <br/>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
});

var classSet = React.addons.classSet;
var BootstrapTables = React.createClass({
  mixins: [SidebarMixin],
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
});

module.exports = BootstrapTables;
