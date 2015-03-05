var request = require('superagent');

var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');


// scoped data
var campaignName = "demo";
var clientName = "rukus";
var compositeFile = "demo";
var campaignId = "54ee8fa4fe1e875f7a77f297";

var Body = React.createClass({
  handleSubmit: function (e) {
    var payload = this.formatPayload(clientName, campaignName, campaignId),
        apiUrl = "http://dev.rukus.io:4000/api",
        coreUrl = "http://dev.rukus.io:8000/renders/kickoff/",
        resource = "renders"
        kickoff = true;

    request
      .post(apiUrl + "/" + resource)
      .send(payload)
      .end(onResponse);

    function onResponse (err, res) {
      if (err) throw (err);

      console.log(res.body);

      if (kickoff) {
        request
          .post(coreUrl + res.body.id)
          .send({ client_name: payload.client_name, campaign_name: payload.campaign_name, composite_file: compositeFile })
          .end(function (err, core_res) {
            if (err) throw (err);

            console.log(core_res);
          });
      }
    }
  },

  formatPayload: function (clientName, campaignName, campaignId) {
        var payload = { content: { text: {}, images: {}, videos: {} }, client_name: clientName, campaign_name: campaignName, created_at: "now", completed: false, campaignId: campaignId },
        demoForm = $(".demo_form")[0].elements,
        field, matches, type, name;

    for (var i = 0, len = demoForm.length; i < len; i++) {
      field = demoForm[i];
      matches = field.name.match(/^content_(text|video|images)_(.*)/);

      if (matches) {
        type = matches[1];
        name = matches[2];

        payload["content"][type][name] = field.value
      }
    }

    return(payload);
  },

  render: function() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={6}>
              <PanelContainer noOverflow controlStyles='bg-green fg-white'>
                <Panel>
                  <PanelHeader className='fg-black'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Video</h3>
                          <br/>
                          <hr/>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <Form className={"demo_form"}>
                            <FormGroup>
                              <Label htmlFor='withicon' control>First Name</Label>
                              <Input name='content_text_first_name' type='text' id='withicon' placeholder='eg. Joe' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='withicon' control>Last Name</Label>
                              <Input name='content_text_last_name' type='text' id='withicon' placeholder='eg. Smith' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='withicon' control>Region</Label>
                              <Input name='content_text_region' type='text' id='withicon' placeholder='eg. Vancouver' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='withicon' control>Email</Label>
                              <Input name='content_text_email' type='text' id='withicon' placeholder='eg. joesmith@email.com' />
                            </FormGroup>
                           </Form>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                  <PanelFooter className='bg-darkgreen45 text-right'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <br/>
                          <div>
                            <Button outlined bsStyle='lightgreen'>cancel</Button>{' '}
                            <Button outlined bsStyle='lightgreen' onClick={this.handleSubmit}>submit</Button>
                          </div>
                          <br/>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelFooter>
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
var Forms = React.createClass({
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

module.exports = Forms;
