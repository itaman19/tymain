import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Media } from 'reactstrap'
import {Input,FormGroup,Form,Col}from 'reactstrap';
import { updateAddress } from '../redux/actioncreator';

export default function Profile() {
    const { username, phone, pin, mail, address } = useSelector(state => state.auth)
    const [newAddress, setnewAddress] = useState(address);
    const [pincode, setpincode] = useState(pin);
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
        e.preventDefault();
        if (pincode.length !== 6) {
            return alert("enter a valid pincode");
        }
        dispatch(updateAddress(newAddress,pincode));
    }
    useEffect(() => {
        if (username) {
        setnewAddress(address);
        setpincode(pin);
    }
       return () => {
           
       }
   }, [])
    return (
        <div className="container">
            <div className=" separation row d-flex justify-content-center mt-4 heading "><h2>My profile</h2></div>
            <div className="row mt-4">
                <Media >
                    <Media left middle>
                        <Media object src="https://cdn4.iconfinder.com/data/icons/universal-5/605/User-512.png" className="profile_image rounded-circle"/>
                    </Media>
                    <Media body className="ml-5">
                        <h4>User Name : <small><i>{username}</i></small></h4>
                        <h4>Mail : <small><i>{mail}</i></small></h4>
                        <h4>Phone Number : <small><i>{phone}</i></small></h4>
                    </Media>
                </Media>
            </div>
            <div className="row mt-4">
                <h4 className="col-12 d-flex justify-content-center bg_light p-3">Address</h4><br></br>
                <h4 className="col-12"><small><i>{address}</i></small></h4>
                <h4 className="col-12">Pincode : <small><i>{pin}</i></small></h4>
                <Form className="was-validated" >
                        <FormGroup row className="d-flex justify-content-center">
                            
                            <Col sm={12} className="mt-2">
                                <Input type="textarea"   value={newAddress} onChange={(e) => setnewAddress(e.target.value)} required/>
                            <div class="invalid-feedback">Please fill out this field.</div>
                            <button className="btn btn-success mt-2" onClick={(e)=>handleUpdate(e)}>Update Address</button>
                            </Col>
                            <Col sm={12} className="mt-3"> 
                                        <Input type="number"  value={pincode} onChange={(e) => setpincode(e.target.value)} required  />
                            <div class="invalid-feedback">This field should be greater than 3 characters</div>
                            <button className="btn btn-success mt-2" onClick={(e)=>handleUpdate(e)}>Update Pincode</button>
                            </Col>
                        </FormGroup>
                        
                    </Form>
                
                
            </div>
        </div>
    )
}
