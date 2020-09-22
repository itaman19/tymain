import React from 'react';
import {Input,FormGroup,Form,Col}from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/login.css';


function Login(){
    return(
        <div className="loginb">
       <div className="container loginp">
           <div className=" col-sm-6 col-lg-4 loginc ">
                <div className="row heading d-flex justify-content-center "><h3>&Bazaar> </h3></div>
                    <Form  >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            <Col sm={12} >
                                <Input type="mail" name="email" id="email" placeholder="enter your e-mail" className="is-invalid" />
                            </Col>
                            <Col sm={12} className="mt-2">                               
                                <Input type="password" name="password" id="password" placeholder="enter your password" />
                            </Col>
                            <Col sm={12} className="mt-4"><Link className="logbutton btn-block d-flex justify-content-center" to="/home">Login</Link></Col>
                            <Col sm={12} className="mt-2 d-flex justify-content-center"><Link to="#" >Forget Password?</Link></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12}><h6 className="midline"><span>OR</span></h6></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12} className="d-flex justify-content-center" >Don't have an account?<Link to="/signup" ><h5>SignUp</h5></Link></Col>
                        </FormGroup>
                        
                    </Form>
                 </div>
            </div> 
       </div>
    );
}

export default Login;