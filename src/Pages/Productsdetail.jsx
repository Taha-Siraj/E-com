import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";
import { FaLuggageCart } from 'react-icons/fa';

const ProductDetail = () => {
  const baseUrl = 'http://localhost:5004';
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${baseUrl}/allproducts`);
      // ✅ Filter product manually from the array
      const matchedProduct = res.data.find(
        (item) => String(item.product_id) === String(id)
      );
      setProduct(matchedProduct || null);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10 text-red-500">Product not found</p>;

  return (
    <div className="mt-24 font-poppins px-16 py-2 flex flex-col gap-4 md:flex-row justify-between  items-start">
     <div className='h-full w-full border p-5 rounded-lg flex justify-center items-center '>
       <img src={product.product_img} alt={product.product_name} className="w-full h-full object-center hover:scale-110 transition-all duration-300 cursor-pointer" />
     </div>
      <div className='flex flex-col px-0 py-0 gap-0 justify-start items-start'>
        <h2 className="text-2xl md:text-3xl font-semibold">{product.product_name}</h2>
        <p className='text-gray-500 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde illum expedita dolores aut nostrum, quidem placeat laborum nemo, beatae perspiciatis quae, sint tempore aliquid molestiae consequatur eum earum.</p>
        <p className="flex justify-center items-center gap-x-2 text-sm text-gray-600 capitalize"><span className='text-[18px] text-black font-semibold' >Description:</span> {product.description || "No description available."}</p>
        <p className="text-md  w-full  text-[#2e902a] flex items-center">
        <MdOutlineStarPurple500 />
        <MdOutlineStarPurple500 />
        <MdOutlineStarPurple500 />
        <MdOutlineStarPurple500 />
        <MdStarPurple500 />
        <span className="text-sm  text-black font-semibold">(120)</span>
      </p>
      <hr className='bg-gray-100 h-[0.1px] w-full'/>
      <p className="text-lg text-green-800 font-bold">Rs. {product.price}.00</p>
      <span className='text-green-700  font-semibold capitalize bg-green-100 py-[2px] rounded-lg px-2'>in Stock</span>
      <hr className='bg-gray-100 h-[0.1px] w-full'/>
      <button className='bg-[#063222cc] w-full flex justify-center gap-x-2 items-center rounded-lg py-2 px-4 font-semibold hover:bg-[#063c28] transition-all  text-[#f0f0f0]'><FaLuggageCart/>
      Add To cart
      </button>
      </div>
    </div>
  );
};

export default ProductDetail;
