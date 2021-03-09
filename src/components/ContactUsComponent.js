import React, { useState } from 'react';
import {Input,FormGroup,Form,Col}from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/contactus.css';
import { useDispatch, useSelector } from 'react-redux';
import { postFeedback } from '../redux/actioncreator';

export default function ContactUs() {
    const {username,mail,phone} = useSelector(state => state.auth);
    const [name, setname] = useState(username);
    const [email, setemail] = useState(mail);
    const [message, setmessage] = useState("");
    const dispatch = useDispatch();
    const handleSend = (e, name, email, message) => {
        e.preventDefault();
        alert("this is your feedback \n" + message);
        dispatch(postFeedback(name, email, message));  
    }
    
    return(
        <div className="container">
            <div className=" separation row d-flex justify-content-center mt-4 heading "><h2>To Contact Us</h2></div>
            <div className="row mt-3 bg_light">
                <div className="separation col-md-6 col-sm-12 vertical_line mt-3 ">
                    <h5 className="d-flex justify-content-center align-items-center mb-2"><i className="fa fa-map-marker mr-1"></i>You can find us here:</h5>
                    <p className=" mb-2">
                    Street:  Sainath Bldg, S.m.road, Near Chunnabhatti Rly Station, Chunnabhatti
                    City:   Mumbai<br></br>
                    State/province/area:    Maharashtra<br></br>
                    Phone number : 00222405035<br></br>
                    Zip code  400022<br></br>
                    Country  India<br></br>
                    </p>
                    <div className="col-12 col-sm-10 offset-md-1 d-flex justify-content-center mb-4">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            
                            <a role="button" className="btn btn-success" href="mailto:amansingh@gmail.com"><i className="fa fa-envelope"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="separation col-md-6 col-12 mt-3">
                <h5 className="d-flex justify-content-center mb-2">You can send your feedback:</h5>
                <Form className="was-validated" >
                        <FormGroup row className="d-flex justify-content-center">
                            <Col sm={12}> 
                                <Input type="text" name="name" id="name" placeholder="enter your name" value={name} onChange={(e) => setname(e.target.value)} required minLength={3} />
                                <div class="invalid-feedback">This field should be greater than 3 characters</div>
                            </Col>
                            <Col sm={12} className="mt-2">
                                <Input type="email" name="email" id="email" placeholder="enter your e-mail" value={email} onChange={(e) => setemail(e.target.value)} required />
                                <div class="invalid-feedback">Please fill out a valid email id </div>
                            </Col>
                            <Col sm={12} className="mt-2">
                                <Input type="textarea" name="message" id="message" placeholder="write your message"  value={message} onChange={(e) => setmessage(e.target.value)} required/>
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </Col>
                            <Col sm={12} className="mt-4"><button className="btn btn1 d-flex justify-content-center" onClick={(e)=>handleSend(e,name, email, message)} disabled={name&&email&&message?0:1}><strong>Send</strong></button></Col>
                        </FormGroup>
                        
                    </Form>
                </div>
                <div className="col-sm-12 mt-3 mb-3 d-flex justify-content-center">
                    <h5 className="errorpara">If you have any trouble contacting us you can drop a mail we will reply you as soon as possible!!</h5>
                </div>
            </div>
        </div>
       
    );
}