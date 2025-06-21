import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {

    let baseUrl = 'http://localhost:5004'
    const [allProduct , setAllProduct] = useState([]);
    const getProduct = async () => {
        try {
           let res = await axios.get(`${baseUrl}`);
           console.log(res.data);
           setAllProduct(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProduct()
    } ,[])
  return (
    <div>
      <h1>Products</h1>
      <div className='flex justify-center gap-x-6 items-center  h-screen'>
        {allProduct.map((eachProduct) => (
            <div key={eachProduct.product_id} className='bg-gray-300 font-poppins min:h-[300px] w-[350px] text-[20px] text-center rounded-lg  drop-shadow-2xl flex justify-start items-center flex-col gap-y-4 py-6 px-3' >
                <p >{eachProduct?.product_name}</p>
                <p>{eachProduct?.price}</p>
                <img src={eachProduct?.product_img} className=' drop-shadow-2xl rounded-lg' alt="img" width={250} />
                <p>{eachProduct?.description}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Products
