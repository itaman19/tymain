import React from 'react';
import '../css/products.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import {products} from '../shared/products';
import {Link} from 'react-router-dom';




function RenderProducts({product}){
    return(
        <Link to={`/products/${product.id}`}>
        <Card className="shadow mb-3">
                <CardImg src={product.image} alt="Product Image" className='d-flex justidy-content-center align-items-center img-fluid p-3'/>
                <CardBody>
                <CardTitle><h5>{product.name}</h5></CardTitle>
                <CardSubtitle>{product.category}</CardSubtitle>
                <CardText><h4>Rs {product.price}</h4></CardText>
                </CardBody>
        </Card>
        </Link>
    );
}

function Products(){
    const productlist = products.map((product)=>{
        return(
            <div className="col-lg-3 col-md-4 col-12 products" key="product.id">
            <RenderProducts product={product}/>
            </div>
        );
    });
    return(
                <div className="container">
                    <div className='row'>{productlist}</div> 
                </div>
        );
    }
    

export default Products;