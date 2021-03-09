import React from "react";
import CarouselComponent from "./CarouselComponent";
import Products from "./ProductsComponent";
import Search from './SearchComponent';

function Home() {
    return(
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-10">
                    <Search/>
                </div>     
            </div>
            <div className="row">
                <CarouselComponent/>   
            </div>
            <div className="row mt-4">
                 <Products />
                
            </div>
        </div>
    );
}

export default Home;