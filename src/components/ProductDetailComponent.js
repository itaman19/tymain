import React from 'react';
import '../css/productsdetail.css';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {products} from "../shared/products";
function ProductDetail({match}){
    const product1=products.filter((product)=>product.id===parseInt(match.params.id,10))[0];
    return(
        <div>
            <div className="container mt-4 ">
                <div className="row breadcrum">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{product1.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row bg-light">
                    <div className="col-md-6 col-12 mb-3 d-flex align-items-center imgproduct bg-white" >
                            <div className="container d-flex justify-content-center align-items-center">
                                <img src={product1.image} alt={product1.name} className="image-fluid"></img>
                            </div>
                    </div>
                    <div className="col-md-6 col-12 mb-3 bg-light">
                        <div className="p-3">
                            <div className="p-name"><h5>{product1.name}</h5></div>
                            <div className="p-description mt-2"><p>{product1.description}</p></div>
                            <h3 className="col-md-6 col-12">Rs {product1.price}</h3>
                            <button className="btn btn1 col-12">Add to cart</button>
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