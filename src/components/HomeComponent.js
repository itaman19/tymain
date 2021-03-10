import React from "react";
import CarouselComponent from "./CarouselComponent";
import Products from "./ProductsComponent";
import Search from './SearchComponent';

function Home() {
    return(
        <div className="container mt-4">
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