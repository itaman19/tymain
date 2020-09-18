import React from 'react';
import { Link } from 'react-router-dom';
import {Input,FormGroup,Form,Col}from 'reactstrap';
import '../css/login.css';
import '../css/signup.css';


function SignUp(){
    return(
        <div className="loginb">
       <div className="container loginp">
           <div className="col-sm-6 col-lg-4 loginc signupc ">
                    <div className="row heading "><h3>&Bazaar></h3></div>
                    <Form  >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            <Col sm={12} className="d-flex align-items-center">
                                <Input type="text" name="username" id="username" placeholder="Full name" />
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="mail" name="email" id="email" placeholder="E-mail" />
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="tel" name="phonenumber" id="telno" placeholder="Phone Number" maxlength={10} size={10}/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center"  >
                                <Input type="textarea" name="address" id="address" placeholder="Enter your address" rows="5" />
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="tel" name="pincode" id="pincode" placeholder="Pincode" maxlength={6} />
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="password" name="password" id="password" placeholder="New password" />
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="password" name="re-password" id="re-password" placeholder="Re-enter password" />
                            </Col>
                            <Col sm={12} className="mt-4"><button className="logbutton btn-block">SignUp</button></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12}><h6><span>OR</span></h6></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12} className="d-flex justify-content-center" >Already have an account?<Link to="/login"><h5>Login</h5></Link></Col>
                        </FormGroup>
                        
                    </Form>
           </div>
       </div> 
       </div>
    );
}

export default SignUp;