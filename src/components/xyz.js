import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const Address = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

    return (
    <div className="container">
      <div className=" separation row d-flex justify-content-center mt-4 heading "><h2>Processing you request</h2></div>
            <div className="row mt-3 bg_light">
                <div className="separation col-12  justify-content-center mt-3 ">
                    <h5 className="d-flex justify-content-center align-items-center mb-2 horizontal_line pb-2"><i className="fa fa-map-marker mr-1"></i>Your Address</h5>
                    <p className=" mb-2">
                    Street:  Sainath Bldg, S.m.road, Near Chunnabhatti Rly Station, Chunnabhatti
                    City:   Mumbai<br></br>
                    State/province/area:    Maharashtra<br></br>
                    Phone number : 00222405035<br></br>
                    Zip code  400022<br></br>
                    Country  India<br></br>
                    </p>
                </div>
            </div> 
            <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            More Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
            </div>
    
  );
}

export default Address;