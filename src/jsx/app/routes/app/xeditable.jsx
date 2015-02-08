var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Reflux = require('reflux');
var CampaignStore = require('../../stores/campaign_store');
var ActionCreators = require('../../actions/campaign_actions');
var API = require('../../utils/api_utils');

// TODO get resource and record id from route
API.get("549e317d75338a1f0b8de152", "campaigns");

function _getStateFromStores () {
  console.log("_getStateFromStores()");
  return {
    mode: 'popup',
    refresh: Body.getCounter(), // used to redraw the component
    campaign: CampaignStore.getCampaign()
  };
}

var Body = React.createClass({
  mixins: [ ReactRouter.State, ReactRouter.Navigation ],

  statics: {
    counter: 0,
    getCounter: function () {
      return 'counter-' + ++Body.counter;
    }
  },

  getInitialState: function () {
    return _getStateFromStores();
  },

  handleModeChange: function (mode, e) {
    e.stopPropagation();
    this.setState({ mode: mode, refresh: Body.getCounter() });
  },

  toggleEditable: function () {
    $('#user .editable').editable('toggleDisabled');
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
                    <Table striped bordered id='user' style={{margin: 0}}>
                      <tbody>
                        <tr>
                          <td style={{width: 300}}>Campaign ID</td>
                          <td>
                            <div href='#' key={this.state.refresh} >{this.state.campaign.id}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300}}>Campaign Name</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'name'} />
                          </td>
                        </tr>
                        <tr>
                          <td>Codecs</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'codecs'} />
                          </td>
                        </tr>
                        <tr>
                          <td>Resolution</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'resolution'} />
                          </td>
                        </tr>
                        <tr>
                          <td>Campaign Stages</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'stages'} />
                          </td>
                        </tr>
                        <tr>
                          <td>Mail</td>
                          <td>
                            <EditableField key={this.state.refresh} campaign={this.state.campaign} type={'mail'} />
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
          onInput={this.emitChange}
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

      if (this.props.onChange && html !== this.lastHtml) {
        e.target = { value: html };
        this.props.onChange(e);
      }

      this.lastHtml = html;
    }
});

var EditableField = React.createClass({
  getInitialState: function () {
    var content = this.props.campaign[this.props.type],
        contentString = (typeof content === "object") ? JSON.stringify(content) : content;

    return { html: contentString };
  },

  handleChange: function (e) {
    this.props.campaign[this.props.type] = e.target.value;
    this.setState({ html: e.target.value, refresh: Body.getCounter(), campaign: this.props.campaign });
  },

  render: function () {
    return <ContentEditable html={this.state.html} onChange={this.handleChange} />
  }
});

var classSet = React.addons.classSet;
var Xeditable = React.createClass({
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

module.exports = Xeditable;
