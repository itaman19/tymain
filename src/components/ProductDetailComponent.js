import React, { useState } from 'react';
import '../css/productsdetail.css';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
//import {products} from "../shared/products";
function ProductDetail({ history, match }) {
    const {products} = useSelector(state => state.products)
    const product = products.filter((product) => product.id === parseInt(match.params.id, 10))[0];
    
    const [qty, setQty] = useState(1);
    
    const handleAddToCart = () => {
        history.push("/cart/"+ match.params.id +"?qty="+qty)
    }
    
    return(
        <div>
            <div className="container mt-4 ">
                <div className="row breadcrum">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{product.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row bg-light">
                    <div className="col-md-6 col-12 mb-3 d-flex align-items-center imgproduct bg-white" >
                            <div className="container d-flex justify-content-center align-items-center">
                                <img src={product.image} alt={product.name} className="image-fluid"></img>
                            </div>
                    </div>
                    <div className="col-md-6 col-12 mb-3 bg_light">
                        <div className="p-3">
                            <div className="p-name"><h5>{product.name}</h5></div>
                            <div className="p-description mt-2"><p>{product.description}</p></div>
                            <h3 className="col-md-6 col-12">Rs {product.price}</h3>
                            <div className="d-flex"><h5>Status:</h5><p className="ml-2">{product.inStock ? <p className="text-success">In Stock</p>: <p className="text-danger">sorry , currently out of Stock</p> }</p></div>
                            {product.inStock ?
                                <div>
                                    <div className="d-flex" >
                                    <h5>Qty:</h5>
                                    <select className="ml-2" value={qty} onChange={(e) =>setQty(e.target.value)}>
                                        {[...Array(product.inStock).keys()].map(x => 
                                            <option value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </div>
                                <button className="btn btn1 col-12 mt-4" onClick={handleAddToCart}>Add to cart</button>
                                </div>:" "}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container bg-light">
                        <h5>Comments:-</h5>
                    </div>
                </div>
            </div>
        </div>
        
    );

}

export default ProductDetail;