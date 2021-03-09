import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { postProduct } from "../redux/actioncreator";

import Products from "./ProductsComponent";

function AdminHome() {
    var formData=new FormData();;
    const [productImage, setproductImage] = useState();
    const [productName, setproductName] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState();
    const [quantity, setquantity] = useState("");
    const imageUpload = (files) => {
        var file = files[0];

        setproductImage(file);
    }
    const dispatch = useDispatch();
    const handleAdd = (e,productName,description,price,quantity,productImage) => {
        e.preventDefault();
        if (productImage) {
            formData.append('imageFile', productImage);
            formData.append('name', productName);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('inStock', quantity);
            formData.append('category', "not decided");
            console.log(formData.get('imageFile'))
            dispatch(postProduct(formData));
        }
        else {
            alert("please insert image");
        }
    }
    return(
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-10">
                    <Accordion >

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0" className="mean-fruit-gradient align-items-center" >
                                            <h5 className="d-flex  justify-content-between">Add new item <b className="fa fa-plus "></b> </h5>
                                            
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="cloudy-knoxville-gradient">
                                                <div>
                                                    <Form className="was-validated" >
                                            <FormGroup row className="d-flex justify-content-center">
                                                            <Col sm={12}>
                                                                <Label className="text-danger">Fill out all the fields then only you will be able to add product**</Label>
                                                            </Col>
                                                            <Col sm={12}>
                                                                <Label htmlFor="image">Product Image</Label>
                                                                <Input type="file" name="image" id="image"  onChange={(e)=>imageUpload(e.target.files)} required/>
                                                            </Col>
                                                            <Col sm={12}>
                                                                <Label htmlFor="name">Product Name</Label>
                                                                <Input type="text" name="name" id="name" placeholder="enter name of the product" value={productName} onChange={(e)=>setproductName(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="description">Description</Label>
                                                                <Input type="textarea" name="description" id="description" placeholder="enter product's description"  value={description} onChange={(e)=>setdescription(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="price">Price</Label>    
                                                                <Input type="number" name="price" id="price" placeholder="enter price " value={price} onChange={(e)=>setprice(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="quantity">Quantity</Label>  
                                                                <Input type="number" name="quantity" id="quantity" placeholder="enter quantity in stock" value={quantity} onChange={(e)=>setquantity(e.target.value)}  required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4 d-flex justify-content-center"><button className="btn btn-lg btn-success col-4 "  onClick={(e)=>handleAdd(e,productName,description,price,quantity,productImage)} disabled={productName&&description&&price&&quantity&&productImage?0:1}><strong>Add</strong></button></Col>
                                                        </FormGroup>
                                                    </Form>
                                                </div>                                                                                              
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Accordion>
                </div>     
            </div>
            
            <div className="row mt-4">
                 <Products />
                
            </div>
        </div>
    );
}

export default AdminHome;