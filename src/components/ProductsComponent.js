import React, { useEffect } from 'react';
import '../css/products.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actioncreator';
import { Loading } from './LoadingComponent';




function RenderProducts({product}){
    return(
        <Link to={`/products/${product._id}`}>
        <Card className="shadow mb-3">
                <CardImg src={"https://localhost:3445/"+product.image} alt="Product Image" className='d-flex justidy-content-center align-items-center img-fluid p-3'/>
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
    const {products,loading,errMess} = useSelector(state => state.products)
    const productlist = products.map((product)=>{
        return(
            <div className="col-lg-3 col-md-4 col-12 products" key={product._id}>
                <RenderProducts product={product}/>
            </div>
        );
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (products.length===0) {
            dispatch(fetchProducts());
        }
        return () => {
            
        }
    }, [])
    return (
        loading
            ?
            <Loading/>    
            :
            errMess
                ?
                <h3 className="d-flex justify-content-center col-12">{errMess}. Check your internet connection ! Or server may be down </h3>
                :
                <div className="container">
                    <div className='row'>{productlist}</div> 
                </div>
        );
    }
    

export default Products;