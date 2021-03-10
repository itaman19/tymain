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
        var phoneCheck = /^[6-9][0-9]{9}$/gm;
        if (!phoneCheck.test(phonenumber)) {
            
           return alert("Enter a valid phone number! if you are entering +91 no need to enter +91")
            
             
           
        }
         if (pincode.length > 6 || pincode.length < 6) {
               return alert("pincode should be of 6 digits")
            }
       if (password !== repassword) {
              return  alert("password and reentered password are not same")
            }
       
        dispatch(signUpUser(email, password,username,phonenumber,address,pincode));
        
        
        
    }

   useEffect(() => {
        if (user) {
            props.history.push('/home');
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
                    <Form  className="was-validated" >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            
                            <Col sm={12} className="d-flex align-items-center">
                                <Input type="text" name="username" id="username" placeholder="Full name" value={username} onChange={(e)=>{setusername(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={(e)=>{setmail(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="text" name="pincode" id="telno" placeholder="Phone Number" value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center"  >
                                <Input type="textarea" name="address" id="address" placeholder="Enter your address" rows="5" value={address} onChange={(e)=>{setaddress(e.target.value,e.keyCode)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="number" name="pincode" id="pincode" placeholder="Pincode" value={pincode} onChange={(e)=>{setpincode(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="password" name="password" id="password" placeholder="New password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2 d-flex align-items-center" >
                                <Input type="password" name="re-password" id="re-password" placeholder="Re-enter password"  value={repassword} onChange={(e)=>{setrepassword(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-4"><button className="logbutton btn-block" onClick={(e)=>{submitHandler(e)}} disabled={username&&email&&phonenumber&&address&&pincode&&password&&repassword?0:1}>SignUp</button></Col>
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