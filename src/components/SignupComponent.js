import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Label,Input,FormGroup,Form,Col}from 'reactstrap';
import '../css/login.css';
import '../css/signup.css';
import { signUpUser } from '../redux/actioncreator';


function SignUp(props) {
    const {token,user,errMess} = useSelector(state => state.auth);
     const dispatch = useDispatch();
    const [email, setmail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [address, setaddress] = useState("");
    const [pincode, setpincode] = useState("");
    const [repassword, setrepassword] = useState("");
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUpUser(email, password));
        
    }

   useEffect(() => {
        if (user) {
            props.location.push('/home');
        }
        if (errMess) {
            alert(errMess);
        }
        return () => {
            //
        }
   }, [errMess, user])

    return(
        <div className="loginb">
       <div className="container loginp">
           <div className="col-sm-6 col-lg-4 loginc signupc ">
                    <div className="row heading "><h3>&Bazaar></h3></div>
                    <Form  >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            
                            <Col sm={12} className="d-flex align-items-center">
                                <Input type="text" name="username" id="username" placeholder="Full name" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="mail" name="email" id="email" placeholder="E-mail" value={email} onChange={(e)=>{setmail(e.target.value)}} />
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="tel" name="phonenumber" id="telno" placeholder="Phone Number" maxlength={10} size={10} value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center"  >
                                <Input type="textarea" name="address" id="address" placeholder="Enter your address" rows="5" value={address} onChange={(e)=>{setaddress(e.target.value)}}/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="tel" name="pincode" id="pincode" placeholder="Pincode" maxlength={6} value={pincode} onChange={(e)=>{setpincode(e.target.value)}}/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="password" name="password" id="password" placeholder="New password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="password" name="re-password" id="re-password" placeholder="Re-enter password"  value={repassword} onChange={(e)=>{setrepassword(e.target.value)}}/>
                            </Col>
                            <Col sm={12} className="mt-4"><button className="logbutton btn-block" onClick={(e)=>{submitHandler(e)}}>SignUp</button></Col>
                        </FormGroup>
                        <FormGroup row >
                            <Col sm={12}><h6 className="midline"><span>OR</span></h6></Col>
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