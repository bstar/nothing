var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Reflux = require('reflux');

// STORE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// some variables and helpers for our fake database stuff
var localStorageKey = "campaign";

function getItemByKey(list,itemKey){
    return _.find(list, function(item) {
        return item.key === itemKey;
    });
}

// ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CampaignActions = Reflux.createActions([
    "addItem",        // called by hitting enter in field in TodoHeader
    "removeItem",     // called by button in TodoItem
    "editItem"        // called by finishing edit in TodoItem
]);

console.log("................................");
console.log(CampaignActions);
console.log("................................");

campaignStore = Reflux.createStore({
  // this will set up listeners to all publishers in RenderActions, using onKeyname (or keyname) as callbacks
  listenables: [CampaignActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return {
      mode: 'popup',
      refresh: Body.getCounter(), // used to redraw the component
      codecs: ["bob"]
    };
  }
});

var Body = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation, Reflux.connect(campaignStore, "campaign")],
  statics: {
    counter: 0,
    getCounter: function() {
      return 'counter-' + ++Body.counter;
    }
  },
  renderEditable: function() {
    console.log(".............................render editable");

    $('.xeditable').editable({
      mode: this.state.mode
    });

    $('#firstname').editable({
      validate: function(value) {
        if($.trim(value) == '') return 'This field is required';
      }
    });

    $('#codecs').editable({
      mode: this.state.mode,
      rows: 5,
      showbuttons: 'bottom'
    });

    $('#stages').editable({
      mode: this.state.mode,
      rows: 10,
      showbuttons: 'bottom'
    });

    $('#resolution').editable({
      mode: this.state.mode,
      rows: 10,
      showbuttons: 'bottom'
    });
    $('#mail').editable({
      mode: this.state.mode,
      rows: 10,
      showbuttons: 'bottom'
    });

    var self = this;
    $('#user .editable').on('hidden', function(e, reason){
      if(reason === 'save' || reason === 'nochange') {
        var $next = $(this).closest('tr').next().find('.editable');
        if(self.refs.autoopen.isChecked()) {
          setTimeout(function() {
            $next.editable('show');
          }, 300);
        } else {
          $next.focus();
        }
      }
    });
  },
  handleModeChange: function(mode, e) {
    e.stopPropagation();
    this.setState({mode: mode, refresh: Body.getCounter()}, this.renderEditable);
  },
  toggleEditable: function() {
    $('#user .editable').editable('toggleDisabled');
  },
  componentDidMount: function() {
    var self = this;

    $.get("http://localhost:4000/api/campaigns/549e317d75338a1f0b8de152", function (res) {
      if (self.isMounted()) {
        console.log("``````````````ajax````````````````````");
        console.log(res);
        console.log("``````````````ajax````````````````````");

        return self.setState({ campaign: res, refresh: Body.getCounter() }, self.renderEditable);
      }
    });

    this.renderEditable();
  },
  render: function() {
    console.log("....................STATE....................");
    console.log(this.state);
    console.log("....................STATE....................");
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
                    <Form horizontal>
                      <FormGroup>
                        <Grid>
                          <Row>
                            <Col xs={6}>
                              <Label>Change mode:</Label>{' '}
                              <Radio inline defaultChecked name='mode' value='popover' onChange={this.handleModeChange.bind(this, 'popover')}>Popover</Radio>
                              <Radio inline name='mode' value='inline' onChange={this.handleModeChange.bind(this, 'inline')}>Inline</Radio>
                            </Col>
                            <Col xs={6} className='text-right'>
                              <Checkbox inline ref='autoopen'><strong>Auto-open next field</strong></Checkbox>
                              <span style={{marginLeft: 10, marginRight: 10}}></span>
                              <Button outlined bsStyle='green' onClick={this.toggleEditable}>Enable/Disable</Button>
                            </Col>
                          </Row>
                        </Grid>
                      </FormGroup>
                    </Form>
                    <Table striped bordered id='user' style={{margin: 0}}>
                      <tbody>
                        <tr>
                          <td style={{width: 300}}>Campaign ID</td>
                          <td>
                            <a href='#' key={this.state.refresh} className='xeditable' data-type='text' data-title='Campaign ID'>{this.state.campaign.id}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{width: 300}}>Campaign Name</td>
                          <td>
                            <a href='#' key={this.state.refresh} className='xeditable' data-type='text' data-title='Campaign Name'>{this.state.campaign.name}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Codecs</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='codecs' data-type='textarea' data-pk='1' data-placeholder='' data-title='Supported Codecs'>{JSON.stringify(this.state.campaign.codecs, null, 2)}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Resolution</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='resolution' data-type='textarea' data-pk='1' data-placeholder='' data-title='Resolution Settings'>{JSON.stringify(this.state.campaign.resolution, null, 2)}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Campaign Stages</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='stages' data-type='textarea' data-pk='1' data-placeholder='' data-title='Listing Stages'>{JSON.stringify(this.state.campaign.stages, null, 2)}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Mail</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='mail' data-type='textarea' data-pk='1' data-placeholder='' data-title='Listing Stages'>{JSON.stringify(this.state.campaign.mail, null, 2)}</a>
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
