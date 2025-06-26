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
                  to='/addproduct'
                  className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-0.5'
                >
                  Add Product
                </Link>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
              {filteredProduct.map((eachProduct) => (
                <div
                  key={eachProduct.product_id}
                  className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden group'
                >
                  <div className='relative'>
                    <img
                      src={eachProduct?.product_img}
                      alt={eachProduct?.product_name}
                      className='w-full h-56 object-cover'
                    />
                     <div className='absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                        {eachProduct?.category_name}
                    </div>
                  </div>

                  <div className='p-5 flex flex-col flex-grow'>
                    <h2 className='text-lg font-bold text-gray-800 truncate' title={eachProduct?.product_name}>
                      {eachProduct?.product_name}
                    </h2>
                    <p className='text-sm text-start text-gray-600 mt-1 mb-4 flex-grow'>
                      {eachProduct?.description}
                    </p>

                    <div className='mt-auto flex items-center justify-between'>
                      <p className='py-2 text-xl font-semibold text-gray-900'>
                        Rs. {eachProduct?.price}
                      </p>
                       <button className='bg-gray-200 text-gray-800 hover:bg-indigo-500 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300'>
                         Add
                       </button>
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