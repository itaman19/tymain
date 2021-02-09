import React, { useState } from 'react';
import '../css/proceedtocheck.css';
import Carousel from 'react-bootstrap/Carousel'

 const  CarouselComponent = (props) => {


  return (
      <div >
        <Carousel>
          <Carousel.Item interval={800}>
            <img
              className="d-block w-100"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/kitchen/Hero/KC_1500x600._CB661392024_.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={800}>
            <img
              className="d-block w-100"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonDevices/FTV-GW/Feb_SMP_1500x600_Utterance._CB661128390_.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={800}>
            <img
              className="d-block w-100"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Hero/1500-x-600_Mi-Eng._CB661158213_.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
          </div>
      );
}
      
export default CarouselComponent;