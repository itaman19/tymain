import React, { useEffect, useState } from 'react';
import '../css/productsdetail.css';
import { Breadcrumb, BreadcrumbItem, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card, Modal, ModalBody, Row } from 'react-bootstrap';
import { addToCart, deleteProduct, fetchComments, fetchProduct, fetchProducts, postComment, updateProduct } from '../redux/actioncreator';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Loading } from './LoadingComponent';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';





function ProductDetail({ history, match }) {
    let comment, rating;
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
    const toggleModal = () => setShow(!show);
    let priceArray;
    const ReviewForm = () => {
    return (<div>
       <Modal show={show} onHide={toggleModal}>
        <Modal.Header >
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <Form >
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="rating">Rating</Label>
                            <Input type="select" model=".rating" id="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Review</Label>
                            <Input type="textarea" model=".comment" id="comment"
                                        rows="6" className="form-control"  />
                            </Col>
                        </Row>
                    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
                <Button variant="primary" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Modal.Footer>
    </Modal>
        
    </div>);
}
    //const product = products.filter((product) => product.id === parseInt(match.params.id, 10))[0];
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.products);
    //const priceArray = product.priceArray;
    const { comments, commentsLoading, commentsErrMess } = useSelector(state => state.comments);
    var formData=new FormData();
    const [productName, setproductName] = useState(product?product.name:"");
    const [description, setdescription] = useState(product?product.description:"");
    const [price, setprice] = useState(product?product.price:"");
    const [quantity, setquantity] = useState(product?product.inStock:"");
    const [productImage, setproductImage] = useState();
    const [qnty, setQty] = useState(1);
    const { isAdmin } = useSelector(state => state.auth);
    const setPropertiesName = () => {
        
        setproductName(product.name);
        setdescription(product.description);
        setprice(product.price);
        setquantity(product.inStock);
        setQty(product.inStock);
    }
    const handleAddToCart = () => {
        
        dispatch(addToCart(product, qnty));
        history.push("/cart");
    }

    const imageUpload = (files) => {
        var file = files[0];
        setproductImage(file);
        
    }
    const handleUpdate = (e, id,productName,description,price,quantity) => {
        e.preventDefault();

        formData.append('_id', id);
        formData.append('imageFile', productImage);
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('inStock', quantity);
        formData.append('category', "not decided");
        dispatch(updateProduct(formData));
        alert("successfully updated")
    }
    const handleSubmitReview = () => {
         comment = document.getElementById("comment").value;
        rating = document.getElementById("rating").value;
        dispatch(postComment(match.params.id,rating, comment));
        
        handleClose();
        
    } 
    const handleDelete = () => {
        dispatch(deleteProduct(match.params.id));
    }
    let CommentsList =  
        comments.map((comment) => {
            const time = comment.createdAt.split("T")[1].split(":");
            console.log(time[0]);
            let hour = time[0] * 1 + 5;
            console.log(hour);
            let minute =time[1] * 1 + 30;
            if (minute > 60) {
                hour++;
                minute = minute - 60;
            }
             if (hour > 24) {
            hour = hour - 24;
            }
            return (
                <div className="media border p-3 col-12 cloudy-knoxville-gradient my-3" key={comment._id}>
                    <img src="https://cdn4.iconfinder.com/data/icons/universal-5/605/User-512.png" alt="image"  className="mr-3 mt-3 rounded-circle comment_image"  ></img>
                    <div className="media-body">
                        <h4>{comment.author.name} <small><i>Posted on {comment.createdAt.split("T")[0]} at {hour}:{minute}{hour<12?" a.m":" p.m" }</i></small></h4>
                        <h4>{[...Array(comment.rating*1).keys()].map(x => 
                                            <span className="fa fa-star"></span>
                                        )} </h4>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            )
        });
    if (product) {
        priceArray = product.priceArray;
    }
       
    const renderLineChart = (
        <LineChart width={600} height={300} data={priceArray} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="amt" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );


    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
        dispatch(fetchComments(match.params.id));
        
        return () => {
            
        }
    }, [])
    
    

    return(
        <div>
            {isAdmin ? "" :
                <div>
                    <ReviewForm />
                    
                </div>}
            {product
                ?
                <div className="container mt-4 ">
                <div className="row breadcrum">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{product.name}</BreadcrumbItem>
                    </Breadcrumb>
                        
                </div>
                <div className="row">
                    <div className="col-md-6 col-12 d-flex align-items-center imgproduct bg-white" >
                            <div className="container d-flex justify-content-center align-items-center">
                                <img src={"https://localhost:3445/"+product.image} alt={product.name} className="image-fluid"></img>
                            </div>
                    </div>
                    <div className="col-md-6 col-12 bg_light">
                        <div className="p-3">
                            <div className="p-name"><h5>{product.name}</h5></div>
                            <div className="p-description mt-2"><p>{product.description}</p></div>
                            <h3 className="col-md-6 col-12">Rs {product.price}</h3>
                            <div className="d-flex"><h5>Status:<b className="ml-2">{product.inStock ? <b className="text-success">In Stock</b>: <b className="text-danger">sorry , currently out of Stock</b> }</b></h5></div>
                            {product.inStock ?
                                isAdmin
                                    ?
                                  
                                    <div  >
                                            <h5>Quantity in Stock: { product.inStock}</h5>
                                    </div>
                                
                           
                                :
                                <div>
                                    <div className="d-flex" >
                                    <h5>Qty:</h5>
                                    <select className="ml-2" value={qnty} onChange={(e) =>setQty(e.target.value)}>
                                        {[...Array(product.inStock*1).keys()].map(x => 
                                            <option value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </div>
                                            <button className="btn btn1 col-12 mt-4" onClick={handleAddToCart}>Add to cart</button>
                                             
                                </div>:" "}
                        </div>
                        </div>
                        
                    </div>
                    
                <div>
                    {isAdmin
                    ?
                    <div className="row">
                        <div className="container my-4">
                           <Accordion>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0" className="mean-fruit-gradient align-items-center" onClick={setPropertiesName} >
                                            <h5 className=" d-flex  justify-content-between">Update this item <b className="fa fa-pencil "></b> </h5>
                                            
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="cloudy-knoxville-gradient">
                                                <div>
                                                    <Form className="was-validated" >
                                                        <FormGroup row className="d-flex justify-content-center">
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="image">Product Image</Label>
                                                                <Input type="file" name="image" id="image" onChange={(e)=>imageUpload(e.target.files)} required />
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="name">Product Name</Label>
                                                                <Input type="text" name="name" id="name" placeholder="enter new name for the product" value={productName} onChange={(e)=>setproductName(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="description">Description</Label>
                                                                <Input type="textarea" name="description" id="description" placeholder="enter product's new description" value={description} onChange={(e)=>setdescription(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="price">Price</Label>    
                                                                <Input type="number" name="price" id="price" placeholder="enter new price " value={price} onChange={(e)=>setprice(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4">
                                                                <Label htmlFor="quantity">Quantity</Label>  
                                                                <Input type="number" name="quantity" id="quantity" placeholder="update stock quantity" value={quantity} onChange={(e)=>setquantity(e.target.value)} required/>
                                                            </Col>
                                                            <Col sm={12} className="mt-4 d-flex justify-content-center"><button className="btn btn-lg btn-success col-4 " onClick={(e)=>{handleUpdate(e,match.params.id,productName,description,price,quantity)}} disabled={productName&&description&&price&&quantity?0:1}><strong>Update</strong></button></Col>
                                                        </FormGroup>
                                                    </Form>
                                                </div>                                                                                              
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Accordion>
                                <Accordion >

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1" className="mean-fruit-gradient" >
                                        <h5 className=" d-flex justify-content-between">Delete this item  <b className="fa fa-trash "></b></h5>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body className="cloudy-knoxville-gradient">      
                                                <div className="d-flex justify-content-center ">
                                                    <button className="btn btn-lg btn-danger col-4" onClick={handleDelete}><b>Delete</b></button>         
                                                </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Accordion>
                        </div>
                    </div>
                    :
                    ""
                }
                    </div>
                    <div className="row bg-light p-3 d-flex justify-content-center align-items-center mb-2" >
                        <div>
                            <h5 className="mt-2">Price Graph :</h5>
                            {renderLineChart}
                        </div>
                        
                    </div>
                    <div className="row">
                            <h5 className="col-12 p-name d-flex justify-content-between align-items-center ">
                                <b>Ratings and Reviews : </b>
                                <Button variant="primary" onClick={toggleModal}>
                                                {isAdmin?"":"Add review"}
                                </Button>
                            </h5>
                            <div className="col-12">
                                {commentsLoading
                                    ?
                                    <Loading></Loading>
                                    :
                                    commentsErrMess
                                        ?
                                        <h5>{commentsErrMess}</h5>
                                        :
                                        comments.length === 0
                                            ?
                                            <a className="text-primary" onClick={toggleModal}><h5>No reviews added yet . Be the first to review this product</h5></a>
                                            :
                                        CommentsList

                                    }
                            </div>
                        </div>
                </div>
                :
                <div>
                    
                    

                </div>
                
            }
            
        </div>
        
    );

}

export default ProductDetail;