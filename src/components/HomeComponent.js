import React from "react";
import Products from "./ProductsComponent";
import Search from './SearchComponent';

function Home(){
    return(
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-10">
                    <Search/>
                </div>     
            </div>
            <div className="row">
                <Products/>
            </div>
        </div>
    );
}

export default Home;