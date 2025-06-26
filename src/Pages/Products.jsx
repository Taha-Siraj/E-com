import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Loader from './Loader';

const Products = () => {
  const baseUrl = 'https://server-ecom-rho.vercel.app';
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setAllcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setloading] = useState(true);

  const getProduct = async () => {
    try {
      const res1 = await axios.get(`${baseUrl}/allproducts`);
      setAllProduct(res1.data);
      setFilteredProduct(res1.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

    try {
      const res2 = await axios.get(`${baseUrl}/allcategories`);
      setAllcategory(res2.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getProduct().finally(() => setloading(false));
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    if (!selected) {
      setFilteredProduct(allProduct);
    } else {
      const filtered = allProduct.filter(prod => String(prod.category_name) === String(selected));
      setFilteredProduct(filtered);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      {loading ? (
        <Loader />
      ) : (
        <div className='font-poppins py-6 px-4 md:px-8'>
          <div className='text-center mb-6'>
            <h1 className='text-4xl md:text-5xl font-bold text-green-700 mb-4'>All Products</h1>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition'
              >
                <option value="">All Categories</option>
                {category.map((eachcategory) => (
                  <option value={eachcategory?.category_name} key={eachcategory.category_id}>
                    {eachcategory?.category_name}
                  </option>
                ))}
              </select>

              <Link
                to='/addproduct'
                className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium shadow-md transition transform hover:scale-95'
              >
                Add Product & Category
              </Link>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch'>
            {filteredProduct.map((eachProduct) => (
              <div
                key={eachProduct.product_id}
                className='bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition'
              >
                <img
                  src={eachProduct?.product_img}
                  alt="img"
                  className='w-[150px] h-[200px] object-contain rounded-lg mb-4 shadow-md'
                />
                <h2 className='text-xl font-semibold text-gray-800 mb-1 capitalize'>
                  {eachProduct?.product_name}
                </h2>
                <p className= 'py-1 text-green-600 font-bold'>Price: Rs. {eachProduct?.price}</p>
                <p className='py-1 text-sm text-gray-600 mb-2'>{eachProduct?.description}</p>
                <p className='py-1 text-sm text-gray-700 mt-1'>Category: {eachProduct?.category_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
