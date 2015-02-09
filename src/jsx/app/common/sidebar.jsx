var ApplicationSidebar = React.createClass({
  render: function() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem href='/app/tables/datatables' glyph='icon-fontello-th-2' name='Renders' />
                  <SidebarNavItem glyph='icon-stroke-gap-icons-Edit' href='/app/forms/campaign' name='Campaign Editor' />
                  <SidebarNavItem glyph='icon-mfizz-fire-alt' href='/app/forms/controls' name='Controls' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

var SidebarSection = React.createClass({
  render: function() {
    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='https://lh3.googleusercontent.com/-MljKeqNnoTU/AAAAAAAAAAI/AAAAAAAAAEs/hgloxKCGXcw/photo.jpg' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 18, fontSize: 16, lineHeight: 1, position: 'relative'}}>Robert DiNicolas</div>
                <div style={{top: 22, fontSize: 12, lineHeight: 1, position: 'relative'}}>Certified Instructor</div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div id='sidebar-container'>
          <Sidebar sidebar={0} active>
            <ApplicationSidebar />
          </Sidebar>
         </div>
      </div>
    );
  }
});

module.exports = SidebarSection;
