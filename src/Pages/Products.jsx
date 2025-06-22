import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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
      console.log("products", error);
    }

    try {
      const res2 = await axios.get(`${baseUrl}/allcategories`);
      setAllcategory(res2.data);
      console.log(res2.data)
    } catch (error) {
      console.log("category", error);
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
      <h1>Products</h1>

      <button className='py-2 px-4 rounded shadow-2xl bg-green-500 border outline hover:scale-95 hover:bg-green-600 text-white capitalize no-underline'>
        <Link  className='no-underline text-xl font-semibold text-[#fff]' to='/addproduct'> Add Product</Link>
        </button>
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

      <div className='flex flex-wrap justify-center gap-6 mt-6'>
        {filteredProduct.map((eachProduct) => (
          <div key={eachProduct.product_id} className='bg-gray-300 w-[350px] text-[20px] text-center rounded-lg drop-shadow-2xl flex flex-col gap-y-4 py-6 px-3'>
            <p>{eachProduct?.product_name}</p>
            <p>{eachProduct?.price}</p>
            <img src={eachProduct?.product_img} className='drop-shadow-2xl rounded-lg' alt="img" width={250} />
            <p>{eachProduct?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
