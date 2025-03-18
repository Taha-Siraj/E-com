import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
const Home = () => {
  return (
    <div className='h-[90vh]'>
     <Carousel className='h-full'>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100 h-[90vh]"
          src="https://rb.gy/wnkmuq"
          alt="First slide"
          
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100 h-[90vh]"
          src="https://rb.gy/wnkmuq"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-[90vh]"
          src="https://rb.gy/wnkmuq"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Home
