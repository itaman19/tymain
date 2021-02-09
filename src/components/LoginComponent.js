import React, { useEffect, useState } from 'react';
import {Input,FormGroup,Form,Col}from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actioncreator';



function Login(props) {

    const {token,user,errMess} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(mail, password));
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
    console.log(mail);
    return(
        <div className="loginb">
       <div className="container loginp">
           <div className=" col-sm-6 col-lg-4 loginc ">
                <div className="row heading d-flex justify-content-center "><h3>&Bazaar> </h3></div>
                    <Form  >
                        <FormGroup row className="d-flex justify-content-center mt-4">
                            <Col sm={12} >
                                <Input type="mail" name="email" id="email" placeholder="enter your e-mail" value={mail} onChange={(e)=>{setmail(e.target.value)}} required/>
                            </Col>
                            <Col sm={12} className="mt-2">                               
                                <Input type="password" name="password" id="password" placeholder="enter your password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required />
                            </Col>
                            <Col sm={12} className="mt-4"><button className="logbutton btn-block d-flex justify-content-center" onClick={(e)=>submitHandler(e)}>Login</button></Col>
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