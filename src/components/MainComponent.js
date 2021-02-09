import React,{useEffect} from "react";
import Home from './HomeComponent';
import {Route,withRouter} from 'react-router-dom';
import ProductDetail from './ProductDetailComponent';
import Header from './HeaderComponent';
import ContactUs from './ContactUsComponent';
import Footer from './FooterComponent'
import xyz from "./xyz";
import Cart from "./CartComponent";
import { useDispatch } from "react-redux";
import Checkout from "./CheckoutComponent";
 
function Main(props) {
    
   /*const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );*/

    return(
        <div>
            <Header />
            <Route exact path="/">{props.errMess ? <Home errMess={props.errMess} /> : <Home products={props.products}/>}</Route>
            <Route exact path="/home">{props.errMess ? <Home errMess={props.errMess} /> : <Home products={props.products}/>}</Route>
            <Route exact path='/products/:id' component={ProductDetail}></Route>
            <Route exact path='/contactus'><ContactUs /></Route>
            <Route exact path='/cart/:id?' component={Cart}></Route>
            <Route exact path='/checkout' component={Checkout}></Route>
            <Route exact path='/xyz' component={xyz}></Route>
            <Footer></Footer>
            </div>
            
    );
}

export default Main;