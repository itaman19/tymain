import React from "react";
import Home from './HomeComponent';
import {Route} from 'react-router-dom';
import ProductDetail from './ProductDetailComponent';
import Header from './HeaderComponent';
import ContactUs from './ContactUsComponent';



function Main(){
    return(
        
        <div>
            <Header/>
            <Route exact path="/home"><Home/></Route>
            <Route exact path='/products/:id' component={ProductDetail}></Route>
            <Route exact path='/contactus'><ContactUs/></Route>
        </div>
    );
}

export default Main;