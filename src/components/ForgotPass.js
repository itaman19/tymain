import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import {Input,FormGroup,Form,Col}from 'reactstrap';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../redux/actioncreator';

export default function ForgotPass() {
    const dispatch = useDispatch();
    const [mail, setmail] = useState("");
     const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(mail));
    }
    return (
       <div className="loginb">
       <div className="container loginp">
           <div className=" col-sm-6 col-lg-4 loginc ">
                <div className="row heading d-flex justify-content-center "><h3>&Bazaar> </h3></div>
                    <Form className="was-validated"  >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            <Col sm={12} >
                                <Input type="email" name="email" id="email" placeholder="enter your e-mail" value={mail} onChange={(e)=>{setmail(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-4"><button className="logbutton btn-block d-flex justify-content-center" onClick={(e)=>submitHandler(e)} disabled={mail?0:1}>Get reset link</button></Col>
                            <Col sm={12} className="mt-2 d-flex justify-content-center"><Link to="/login" ><b>Login</b></Link></Col>
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
    )
}
