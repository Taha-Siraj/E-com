import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Loader from './Loader';

const Products = () => {
  // const baseUrl = 'https://server-ecom-rho.vercel.app';
  const baseUrl = 'http://localhost:5004';

  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setAllcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setloading] = useState(true);

  const getProduct = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${baseUrl}/allproducts`),
        axios.get(`${baseUrl}/allcategories`)
      ]);
      setAllProduct(productsRes.data);
      setFilteredProduct(productsRes.data);
      setAllcategory(categoriesRes.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch data');
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
        <div className='font-poppins bg-gray-50 min-h-screen'>
          <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>

            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8'>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 text-center md:text-left'>
                Our Products
              </h1>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                <select
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                  className='w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300'
                >
                  <option value="">All Categories</option>
                  {category.map((eachcategory) => (
                    <option value={eachcategory?.category_name} key={eachcategory.category_id}>
                      {eachcategory?.category_name}
                    </option>
                  ))}
                </select>

                <Link
                  to='/AddCategories'
                  className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-0.5'
                >
                  Add Categories
                </Link>
              </div>
            </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 p-4'>
            {filteredProduct.map((eachProduct) => (
              <div
                key={eachProduct.product_id}
                className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden border border-gray-200 group' 
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={eachProduct?.product_img}
                    alt={eachProduct?.product_name || "Product Image"}
                    className='w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300' 
                  />
                  {eachProduct?.category_name && ( 
                    <div className='absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'> 
                      {eachProduct.category_name}
                    </div>
                  )}
                </div>

                <div className='px-2 text-center py-5 flex flex-col'>
                  <h2 className='text-[17px] font-extrabold text-gray-900 ' title={eachProduct?.product_name}> 
                    {eachProduct?.product_name}
                  </h2>
                  

                  <div className='flex flex-col gap-y-8 items-center justify-between mt-auto pt-4 border-t border-gray-100'>
                    <p className='text-2xl font-bold text-gray-900'>
                      Rs. <span className='text-green-600'>{eachProduct?.price}</span> 
                    </p>
                    <p className='text-sm text-gray-600 '>
                    {eachProduct?.description || "No description available."}
                  </p>
                
                  </div>
                </div>
              </div>
            ))}
          </div>
                      
            {filteredProduct.length === 0 && (
                <div className='text-center py-20'>
                    <h2 className='text-2xl font-semibold text-gray-700'>No Products Found</h2>
                    <p className='text-gray-500 mt-2'>Please try selecting a different category.</p>
                </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Products;