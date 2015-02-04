var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Body = React.createClass({
  render: function() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={6} collapseRight>
              <PanelContainer noOverflow controlStyles='bg-green fg-white'>
                <Panel>
                  <PanelHeader className='fg-black'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Email</h3>
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
                          <Form>
                            <FormGroup>
                              <Label htmlFor='emailaddress'>Email address</Label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <Icon glyph='icon-fontello-mail' />
                                </InputGroupAddon>
                                <Input autoFocus type='email' id='emailaddress' placeholder='Email address' />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='password'>Password</Label>
                              <InputGroup>
                                <Input type='password' id='password' placeholder='Password' />
                                <InputGroupAddon>
                                  <Icon glyph='icon-fontello-key' />
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup feedback>
                              <Label htmlFor='withicon' control>With icon</Label>
                              <Input type='text' id='withicon' placeholder='Search' />
                              <Icon bundle='fontello' glyph='search' feedback/>
                            </FormGroup>
                            <FormGroup feedback>
                              <Label htmlFor='inputwithicon' control>Input with icon</Label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <Icon glyph='icon-fontello-alert' />
                                </InputGroupAddon>
                                <Input type='text' id='inputwithicon' placeholder='Search' />
                                <Icon bundle='fontello' glyph='search' feedback/>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='textarea'>Textarea</Label>
                              <Textarea id='textarea' rows='3' placeholder='Some text here...' />
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
                            <Button outlined bsStyle='lightgreen'>submit</Button>
                          </div>
                          <br/>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelFooter>
                </Panel>
              </PanelContainer>
            </Col>

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
                          <Form>
                            <FormGroup>
                              <Label htmlFor='withicon' control>First Name</Label>
                              <Input type='text' id='withicon' placeholder='eg. Joe' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='withicon' control>Last Name</Label>
                              <Input type='text' id='withicon' placeholder='eg. Smithy' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='withicon' control>Location</Label>
                              <Input type='text' id='withicon' placeholder='eg. Vancouver' />
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
                            <Button outlined bsStyle='lightgreen'>submit</Button>
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
