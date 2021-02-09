import React, { useEffect, useState } from 'react';
import {Progress, TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import '../css/proceedtocheck.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart, removeCartItem, fetchCartItems } from '../redux/actioncreator';
import { Link } from 'react-router-dom';


const Checkout = (props) => {
  const [paymentMethod, setpaymentMethod] = useState("COD");
  const address =
    ` Street:  Sainath Bldg, S.m.road, Near Chunnabhatti Rly Station, Chunnabhatti
       City:   Mumbai
       State/province/area:    Maharashtra
       Phone number : 00222405035
       Zip code  400022
       Country  India` ;
  const [activeTab, setActiveTab] = useState('1');
  const [progress, setprogress] = useState(30);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const { cartItems } = useSelector(state => state.cart);
  console.log(cartItems)
  const dispatch = useDispatch();
  const cartItemsList =
        cartItems.map((cartItem) => {
            return (
            <div className="media border border-bottom-1" key={cartItem.id}>
                    <img src={cartItem.image} alt="product_image" className="d-flex col-3 img img-fluid cart_img" />
                    <div class="media-body" className="col-9 mt-3">
                        <div className=" d-flex justify-content-between">
                            <div>
                                <Link to={`/products/${cartItem.id}`} ><h3>{cartItem.name}</h3></Link>
                                <div className="d-flex ">
                                    <h5>Status:</h5>
                                    <b className="ml-2">{cartItem.inStock ? <p className="text text-success">In Stock</p> : <p className="text text-danger">Sorry , currently out of Stock</p>}</b>
                                </div>
                                <div className="d-flex">
                                    <h5>Qty:</h5>
                                    <select className="ml-2" value={cartItem.qty} onChange={(e) =>dispatch(updateCart(cartItem,e.target.value))}>
                                                {[...Array(cartItem.inStock).keys()].map(x => 
                                                    <option key={x+1} value={x + 1}>{x + 1}</option>
                                                )}
                                    </select>
                                </div>
                                <button className="btn btn-outline-danger my-3" onClick={()=>dispatch(removeCartItem(cartItem.id))}><i class="fa fa-trash" aria-hidden="true"></i> <b>Remove</b></button>
                            </div>
                            <h2 className="mt-2">Rs {cartItem.price*cartItem.qty}</h2> 
                        </div>
                        
                            
                    </div>
            </div>
        );
        });
    useEffect(() => {
      dispatch(fetchCartItems());
      return () => {
        
      }
    }, [])
  return (
    <div>
      <div className="container bg_light pb-4">
       
        
       {/*<div><span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span></div>*/}
        <div className=" separation row d-flex justify-content-center mt-4 heading"><h2 className="text text-white">Processing your request</h2></div>
        
        <Progress color="success" animated value={progress} className="my-3" ><b>{progress}%</b></Progress>
        <div className="text-center text-success"><h5>{ progress===100?" Almost done , your order is just a  click away.... ":"Processing...."}</h5></div>
            <div className="mt-3 p-5">
              <Nav tabs>
                <NavItem >
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1');setprogress(30)}}
                  >
                   1] Address
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); setprogress(60); }}
                  >
                   2] Payment method
                  </NavLink>
              </NavItem>
               <NavItem >
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); setprogress(100); }}
                  >
                   3] Order Summary
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1"className="bg-white" >
                  <Row>
                    <Col sm="12">
                      <div className="separation col-12  justify-content-center mt-3 border-1 ">
                    <h5 className="d-flex justify-content-center align-items-center mb-2 horizontal_line pb-2"><i className="fa fa-map-marker mr-1"></i>Delivery will be on this Address</h5>
                    <div class="form-check">
                      <label class="form-check-label" htmlFor="address">
                        <input type="radio" class="form-check-input" name="optradio" id="address"  checked/>
                        {address}<br></br>
                        Phone Number: 79129034003 , PinCode : 123890 , State : Maharashtra
                      </label>
                    </div>
                    
                    <button className="btn btn-outline-success my-5 col-sm-12 col-md-4 d-flex justify-content-center" onClick={() => { toggle('2');setprogress(60) }} ><b>Proceed  <i class="fa fa-arrow-right" ></i></b></button>
                        </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2" className="bg-white">
                  <Row>
                    <Col sm="12">
                      <div className="separation col-12  justify-content-center mt-3 border-1 ">
                    <h5 className="d-flex justify-content-center align-items-center mb-2 horizontal_line pb-2"><i className="fa fa-inr mr-2 "></i>Select your payment type</h5>
                    <div className="form-check">
                        <label className="form-check-label col-12" htmlFor="COd">
                        <input type="radio" className="form-check-input " name="optradio" id="COD" value="COD" onChange={(e)=>setpaymentMethod(e.target.value)}  checked/>
                        COD(Cash on Delivery)
                      </label>
                      <label className="form-check-label col-12" htmlFor="Credit Card">
                        <input type="radio" className="form-check-input " name="optradio" id="Credit Card" value="Credit Card"  disabled />
                        Credit Card
                      </label>
                      <label className="form-check-label col-12" htmlFor="Debit Card">
                        <input type="radio" className="form-check-input " name="optradio" id="Debit Card" value="Debit Card"  disabled />
                      Debit Card
                      </label>
                      <label className="form-check-label col-12" htmlFor="UPI">
                        <input type="radio" className="form-check-input " name="optradio" id="UPI" value="UPI"  disabled />
                        UPI
                      </label>
                   </div>
                     <p className="text-danger">Sorry , Only cash on delivery is avaible at this moment</p>
                    <button className="btn btn-outline-success my-5 col-sm-12 col-md-4 d-flex justify-content-center" onClick={() => { toggle('3'); setprogress(100); }} ><b>Proceed  <i class="fa fa-arrow-right" ></i></b></button>
                        </div>
                    </Col>
                  </Row>
            </TabPane>
            <TabPane tabId="3" className="bg-white">
                  <Row>
                    <Col sm="12">
                  {cartItemsList}
                  <div className=" d-flex justify-content-between p-3">
                            <div>
                               <h3> <b>Total amount payable:</b></h3>
                            
                      
                    </div>
                    <div>
                      <h1><i className="fa fa-inr mr-2 " />{cartItems.reduce((a, c) => a + c.qty * c.price, 0)}</h1>
                    <button className="btn btn-lg btn-outline-success my-3" ><i class="fa fa-check-circle" ></i> <b>Place Order</b></button>
                    </div>
                  </div>
                  
                            
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
        </div>
        
      </div>
      
      
    </div>
  );
}

export default Checkout;