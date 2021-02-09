import React, { useEffect } from 'react';
import '../css/products.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actioncreator';




function RenderProducts({product}){
    return(
        <Link to={`/products/${product.id}`}>
        <Card className="shadow mb-3">
                <CardImg src={product.image} alt="Product Image" className='d-flex justidy-content-center align-items-center img-fluid p-3'/>
                <CardBody>
                <CardTitle><h5>{product.name}</h5></CardTitle>
                <CardSubtitle>{product.category}</CardSubtitle>
                <h4><CardText>Rs {product.price}</CardText></h4>
                </CardBody>
        </Card>
        </Link>
    );
}

function Products() {
    const {products} = useSelector(state => state.products)
    const productlist = products.map((product)=>{
        return(
            <div className="col-lg-3 col-md-4 col-12 products" key="product.id">
                <RenderProducts product={product}/>
            </div>
        );
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
        return () => {
            
        }
    }, [])
    return(
                <div className="container">
                    <div className='row'>{productlist}</div> 
                </div>
        );
    }
    

export default Products;