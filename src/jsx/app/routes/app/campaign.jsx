var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Reflux = require('reflux');
var CampaignStore = require('../../stores/campaign_store');
var ActionCreators = require('../../actions/campaign_actions');
var API = require('../../utils/api_utils');

// TODO get resource and record id from route
API.getOne("54d82b4ed878b913a1c9cc1d", "campaigns");

function _getStateFromStores () {
  return {
    refresh: Body.getCounter(), // used to redraw the component
    campaign: CampaignStore.getCampaign()
  };
}

var heading = {
  border: 'none',
  'fontWeight': 'bold',
  'fontSize': '1.2em',
  'backgroundColor': 'white'
};

var noBorder = {
  border: 'none',
  margin: 0
};

var Body = React.createClass({
  mixins: [ ReactRouter.State, ReactRouter.Navigation ],

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
    this.campaign = CampaignStore.listen(this._onChange);
  },

  componentWillUnmount: function () {
    this.campaign();
  },

  _onChange: function () {
    this.setState(_getStateFromStores());
  },

  _onUpdated: function () {
    ActionCreators.updateCampaign(this.state.campaign);
  },

  render: function() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer noOverflow controlStyles='bg-orange75 fg-white'>
                <Panel>
                  <PanelHeader className='bg-pinkishred fg-white' style={{margin: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Campaign Editor</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody style={{padding: 25}}>
                    <Table striped bordered id='user' style={noBorder}>
                      <tbody>
                        <tr>
                          <td style={heading}>Base Configuration</td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Campaign ID</td>
                          <td>
                            <div href='#' key={this.state.refresh}>{this.state.campaign.id}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Campaign Name</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'name'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Codecs</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'codecs'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Resolution</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'resolution'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Campaign Stages</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'stages'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={heading}>Mail Configuration</td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Active</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.active'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Subject</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.subject'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>First Name</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.first_name'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Last Name</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.last_name'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>To Email</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.to_email'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>To Name</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.to_name'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>From Email</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.from_email'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>From Name</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.from_name'} />
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300, 'fontWeight':'bold'}}>Global Merge Vars</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail.default.global_merge_vars'} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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

var ContentEditable = React.createClass({
    render: function () {
      return <div id="contenteditable"
          onBlur={this.emitChange}
          contentEditable
          dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    },

    shouldComponentUpdate: function (nextProps) {
      return nextProps.html !== this.getDOMNode().innerHTML;
    },

    componentDidUpdate: function () {
      if ( this.props.html !== this.getDOMNode().innerHTML ) {
        this.getDOMNode().innerHTML = this.props.html;
      }
    },

    emitChange: function (e) {
      var html = this.getDOMNode().innerHTML;

      if (this.props.onBlur && html !== this.lastHtml) {
        e.target = { value: html };
        this.props.onBlur(e);
      }

      this.lastHtml = html;
    }
});

var EditableField = React.createClass({
  getInitialState: function () {
    var campaign = this.props.campaign,
        types = this.props.type.split(".");

    for (var i = 0, len = types.length; i < len; i++) {
      campaign = campaign[types[i]];
    }

    return { html: JSON.stringify(campaign) };
  },

  handleChange: function (e) {
    var campaign = this.props.campaign,
        path = this.props.type.split("."),
        campaignStr = "campaign",
        value = JSON.parse(e.target.value);

    for (var i = 0, len = path.length; i < len; i++) {
      campaignStr += '.' + path[i];
    };

    eval(campaignStr + "=value");

    CampaignStore.updateCampaign(campaign);
    this.setState({ html: e.target.value, refresh: Body.getCounter(), campaign: campaign });
  },

  render: function () {
    return <ContentEditable html={this.state.html} campaign={this.state.campaign} type={this.state.type} onBlur={this.handleChange} />
  }
});

var classSet = React.addons.classSet,
    CampaignView = React.createClass({
      mixins: [SidebarMixin],
      render: function () {
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

module.exports = CampaignView;
