import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
const Products = () => {
  let baseUrl = 'http://localhost:5004'
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setAllcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const getProduct = async () => {
    try {
      const res1 = await axios.get(`${baseUrl}/allproducts`);
      setAllProduct(res1.data);
      setFilteredProduct(res1.data);
      console.log(res1.data)
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    
    try {
      const res2 = await axios.get(`${baseUrl}/allcategories`);
      setAllcategory(res2.data);
      console.log(res2.data)
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    if (!selected) {
      setFilteredProduct(allProduct);
    } else {
      const filtered = allProduct.filter(prod => String(prod.category_id) === String(selected));
      setFilteredProduct(filtered);
    }
  };
  
  return (
    <div className='font-poppins flex flex-col justify-center items-center gap-y-3 py-3'>
       <Toaster position="top-center" richColors />
      <h1 className='text-5xl text-green-700 font-semibold font-poppins' >Products</h1>
      <select
        onChange={handleCategoryChange}
        value={selectedCategory}
        className='py-2 px-3 border rounded-md outline-none'>
        <option value="">All Categories</option>
        {category.map((eachcategory) => (
          <option value={eachcategory?.category_id} key={eachcategory.category_id}>
            {eachcategory?.category_name}
          </option>
        ))}
      </select>

      <div className=' flex flex-wrap gap-y-10 gap-x-10 md:flex-row flex-col justify-center items-center'>
        {filteredProduct.map((eachProduct) => (
          <div key={eachProduct.product_id} className='justify-center items-center bg-gray-300 w-[400px] text-[20px] rounded-lg shadow-inner text-center flex flex-col gap-y-6 py-6 px-3  h-[400px] '>
            <img src={eachProduct?.product_img} className='drop-shadow-2xl rounded-lg' alt="img" width={150} height={200} />
            <p className='text-xl capitalize font-semibold text-neutral-600' >product Name:  {eachProduct?.product_name}</p>
            <p className='text-green-500 capitalize ' >price: {eachProduct?.price}</p>
            <p className='text-[17px] font-thin'>{eachProduct?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
