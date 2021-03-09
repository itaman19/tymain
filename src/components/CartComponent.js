import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import "../css/cart.css"
import { addToCart, emptyCart, fetchCartItems, removeCartItem, updateCart } from '../redux/actioncreator';
import { Loading } from './LoadingComponent';


export default function Cart({ match, location, history }) {
    let cartItemsList;
    const { cartItems,loading ,errMess} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    if (cartItems.length != 0) {
         cartItemsList =
             cartItems.map((cartItem) => {
            return (
            <div className="media border border-bottom-1" key={cartItem.product._id}>
                    <img src={"https://localhost:3445/"+cartItem.product.image} alt="product_image" className="d-flex col-3 img img-fluid cart_img" />
                    <div class="media-body" className="col-9 mt-3">
                        <div className=" d-flex justify-content-between">
                            <div>
                                <Link to={`/products/${cartItem.product._id}`} ><h3>{cartItem.product.name}</h3></Link>
                                <div className="d-flex ">
                                    <h5>Status:</h5>
                                    <b className="ml-2">{cartItem.product.inStock ? <p className="text text-success">In Stock</p> : <p className="text text-danger">Sorry , currently out of Stock</p>}</b>
                                </div>
                                <div className="d-flex">
                                    <h5>Qty:</h5>
                                    <select className="ml-2" value={cartItem.qnty} onChange={(e) =>dispatch(updateCart(cartItem,e.target.value))}>
                                                {[...Array(cartItem.product.inStock*1).keys()].map(x => 
                                                    <option key={x+1} value={x + 1}>{x + 1}</option>
                                                )}
                                    </select>
                                </div>
                                <button className="btn btn-outline-danger my-3" onClick={()=>removeFromCart(cartItem.product._id)}><i class="fa fa-trash" aria-hidden="true"></i> <b>Remove</b></button>
                            </div>
                            <h2 className="mt-2">Rs {cartItem.product.price*cartItem.qnty}</h2> 
                        </div>
                        
                            
                    </div>
                </div>
                );
        });
    }
    
        
    
    function removeFromCart(id){
        dispatch(removeCartItem(id));
    }
    
    const checkout = () => {
        history.push('/checkout');
    }
    const emptyCartItems = () => {
        dispatch(emptyCart());
    }
    useEffect(() => {
        if (cartItems.length===0) {
            dispatch(fetchCartItems());
        }
        return () => {
           
        }
    }, []);

    
    return (
        <div className="container mt-5">
            <div className="row ">
                <h2 className="heading col-12 d-flex justify-content-center">MyCart</h2>
                <div className="col-12 col-md-8   cart_separation vertical_line" >
                    {loading ?
                        <Loading />
                        :
                        errMess
                            ?
                            <h3 className="d-flex justify-content-center col-12">{errMess}. Check your internet connection ! Or server may be down </h3>
                            :
                            cartItems.length === 0
                                ?
                                <Link to="/home"><h5>No items in cart,Go to home and continue shopping!</h5></Link>
                                
                                :
                                cartItemsList

                    }
                </div>
                <div className=" col-12 col-md-4 d-flex justify-content-center ">
                     
                        <div className=" col-12" >
                            <div className="bg_light col-12 p-3 border border-dark">
                                <div className="horizontal_line">
                                    <h4 >Subtotal : {cartItems.reduce((a,c)=>a+c.qnty*1,0) } Items</h4>
                                    <h1>Price : Rs {cartItems.reduce((a, c) => a + c.qnty * c.product.price, 0)}</h1>
                                </div>
                            <button className="btn btn1 p-2 mt-3 mb-3 d-flex justify-content-center" disabled={cartItems.length === 0} onClick={checkout} >Proceed To Checkout</button>
                            <button className= "btn btn-danger p-2 mt-3 mb-3 d-flex justify-content-center" disabled={cartItems.length===0} onClick={emptyCartItems} >Empty Cart</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}