import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Product from "./Product"
import Fotter from "./Fotter"
const Home = () => {
  return (
    <div className='h-[90vh]'>
   <Carousel className="relative h-full">
  <Carousel.Item interval={1000} className="relative">
    <img className="d-block w-100 h-[90vh] object-cover" src="thumb-01.jpg" alt="Exclusive Drop" />
    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
      <h3 className="text-5xl font-extrabold text-white drop-shadow-2xl tracking-wide">🔥 Exclusive Drop! 🚀</h3>
      <p className="text-xl text-white mt-2 bg-black/50 px-4 py-2 rounded-xl">
        Unleash the Elegance – Limited Edition! 💎
      </p>
    </div>
  </Carousel.Item>

  <Carousel.Item interval={500} className="relative">
    <img className="d-block w-100 h-[90vh] object-cover" src="slide-02.jpg" alt="Luxury Redefined" />
    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
      <h3 className="text-5xl font-extrabold text-white drop-shadow-2xl tracking-wide">✨ Luxury Redefined ✨</h3>
      <p className="text-xl text-white mt-2 bg-black/50 px-4 py-2 rounded-xl">
        Experience premium craftsmanship like never before.
      </p>
    </div>
  </Carousel.Item>

  <Carousel.Item className="relative">
    <img className="d-block w-100 h-[90vh] object-cover" src="slide-03.jpg" alt="Limited Edition" />
    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
      <h3 className="text-5xl font-extrabold text-white drop-shadow-2xl tracking-wide">💎 Limited Edition 💎</h3>
      <p className="text-xl text-white mt-2 bg-black/50 px-4 py-2 rounded-xl">
        Only a few pieces left – Get yours now! 🛍️
      </p>
    </div>
  </Carousel.Item>
   </Carousel>
   <Product/>
   <Fotter/>
    </div>
  )
}

export default Home
