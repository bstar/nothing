var request = require('superagent');

var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  handleSubmit: function (e) {
    var payload = this.formatPayload();
    var apiUrl = "http://localhost:4000/api";
    var coreUrl = "http://localhost:8000/renders/kickoff";
    var resource = "renders";

    request
      .post(apiUrl + "/" + resource)
      .send(payload)
      .end(onResponse);

    function onResponse(err, res) {
      console.log(res);
    }

    console.log(payload);
  },

  formatPayload: function () {
    var campaignId = "54d82b4ed878b913a1c9cc1d",
        clientId = "blank",
        payload = { content: { text: {}, images: {}, videos: {} }, clientId: clientId, campaignId: campaignId, created_at: "now", completed: "true" },
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


  //def format_api_payload(content, client_id, campaign_id, config_id)
    //file = File.read("#{Rails.root.join('lib', 'properties', client_id, campaign_id)}/#{config_id}.json")
    //properties = JSON.parse(file)

    //content.delete("no_where") if content[:no_where] == ""

    //payload = { :content => { :text => {}, :images => {}, :videos => {} }, :client_id => client_id, :campaign_id => campaign_id  }.merge(properties)
    //payload[:geo] = Geokit::Geocoders::MultiGeocoder.geocode(request.remote_ip)
    //payload[:ipaddress] = request.remote_ip


    //content.each do |key, value|
      //if key.match(/content/)
        //matches  = key.match(/^content_(.*)_(.*)$/)
        //type     = matches[2].to_sym
        //name     = matches[1].to_sym

        //payload[:content][type][name] = value
      //else
        //payload[key] = value
      //end
    //end

    //payload[:content][:text][:full_name] = payload[:content][:text][:first_name] + " " + payload[:content][:text][:last_name]

    //return payload
  //end

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
                              <Label htmlFor='withicon' control>Location</Label>
                              <Input name='content_text_location' type='text' id='withicon' placeholder='eg. Vancouver' />
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
