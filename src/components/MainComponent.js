import React,{useEffect} from "react";
import Home from './HomeComponent';
import {Redirect, Route} from 'react-router-dom';
import ProductDetail from './ProductDetailComponent';
import Header from './HeaderComponent';
import ContactUs from './ContactUsComponent';
import Footer from './FooterComponent'
import AdminHeader from './AdminHeaderComponent'
import AdminHome from './AdminHomeComponent'
import Cart from "./CartComponent";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./CheckoutComponent";
import Orders from "./OrdersComponent";
import Users from './UsersComponent';
import { checkJwtToken, fetchCartItems, fetchOrders, fetchProducts } from "../redux/actioncreator";
import AdminOrders from "./AdminOrdersComponent";
import Feedbacks from "./FeedbackComponent";
import Profile from "./ProfileComponent";
import ForgotPass from "./ForgotPass";
 
function Main(props) {
  const dispatch = useDispatch();
  const { username, isAdmin } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkJwtToken());
    return () => {
      
    }
  }, [])

  return (
    <div>
      {isAdmin
        ?
        <div>
          <AdminHeader />
          <Route exact path="/"> <AdminHome/></Route>
          <Route exact path="/home"><AdminHome /> </Route>
          <Route exact path='/products/:id' component={ProductDetail}></Route>
          <Route exact path='/users' component={Users}></Route>
          <Route exact path='/orders' component={AdminOrders}></Route>
          <Route exact path='/feedbacks' component={Feedbacks}></Route>
          
          <Footer/>
        </div>
          :
          username
            ?
          <div>
            
            <Header />
            <Route exact path="/"><Home /></Route>
            <Route exact path="/home"><Home /></Route>
            <Route exact path='/products/:id' component={ProductDetail}></Route>
            <Route exact path='/contactus'><ContactUs /></Route>
            <Route exact path='/cart/:id?' component={Cart}></Route>
            <Route exact path='/checkout' component={Checkout}></Route>
            <Route exact path='/orders' component={Orders}></Route>
            <Route exact path='/profile' component={Profile}></Route>
            <Footer></Footer>
          </div>
          :
          <Redirect to="/login"></Redirect>
}
        </div>
            
    );
}

export default Main;