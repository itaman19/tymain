import React from 'react';
import {Input,FormGroup,Form,Col}from 'reactstrap';
import '../css/login.css';

function Login(){
    return(
        <div className="loginb">
       <div className="container loginp">
           <div className=" col-sm-6 col-lg-4 loginc ">
                <div className="row heading d-flex justify-content-center "><h3>E-Bazaar </h3></div>
                    <Form  >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            <Col sm={12}  ><Input type="mail" name="email" id="email" placeholder="enter your e-mail" /></Col>
                            <Col sm={12} className="mt-2" ><Input type="password" name="password" id="password" placeholder="enter your password" /></Col>
                            <Col sm={12} className="mt-4"><button className="logbutton btn-block">Login</button></Col>
                            <Col sm={12} className="mt-2 d-flex justify-content-center"><a href="#" >Forget Password?</a></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12}><h6><span>OR</span></h6></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12} className="d-flex justify-content-center" >Don't have an account?<a href="/SignupComponent" ><h5>SignUp</h5></a></Col>
                        </FormGroup>
                        
                    </Form>
                 </div>
            </div> 
       </div>
    );
}

export default Login;