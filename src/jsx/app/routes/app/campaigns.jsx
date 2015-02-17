var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Reflux = require('reflux');
var CampaignStore = require('../../stores/campaign_store');
var ActionCreators = require('../../actions/campaign_actions');
var API = require('../../utils/api_utils');

API.get("campaigns");

function _getStateFromStores () {
  return {
    refresh: Body.getCounter(), // used to redraw the component
    campaigns: CampaignStore.getCampaigns()
  };
}

var Body = React.createClass({
  mixins: [ ReactRouter.State, ReactRouter.Navigation ],
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

  refresh: function () {
    return this.state.refresh;
  },

  statics: {
    counter: 0,
    getCounter: function () {
      return 'counter-' + ++Body.counter;
    }
  },

  getInitialState: function () {
    return _getStateFromStores();
  },

  componentDidMount: function () {
    this.loadTable();
    this.campaigns = CampaignStore.listen(this._onChange);
  },

  componentWillUnmount: function () {
    this.campaigns();
  },

  _onChange: function () {
    this.setState(_getStateFromStores());
  },

  render: function() {
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
                                <th>Name</th>
                                <th>Codecs</th>
                                <th>Stages</th>
                                <th>Edit</th>
                              </tr>
                            </thead>
                            <tbody>
                              { this.state.campaigns.map(function (campaign, i) {
                                return (
                                  <tr key={i}>
                                    <td>{campaign.id}</td>
                                    <td>{campaign.name}</td>
                                    <td>{campaign.codecs[0]}</td>
                                    <td>{campaign.stages[0]}</td>
                                    <td><EditRecord id={campaign.id}/></td>
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

var EditRecord = React.createClass({
    render: function () {
      var url = "/app/campaigns" + "/" + this.props.id;

      return <a href={url}>edit</a>
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
