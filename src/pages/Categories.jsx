import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
      return res.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  // Fetch products from API
  const fetchProduct = async () => {
    try {
      const res = await axios.get("https://api.escuelajs.co/api/v1/products");
      return res.data;
    } catch (error) {
      console.log("Error fetching products:", error);
      return [];
    }
  };

  // Queries for fetching data
  const { data: products = [], isLoading: prodisLoading, isError: prodisError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct
  });

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });

  // Filter products based on selected category
  const filterProduct = selectedCategory
    ? products.filter(product => product?.category?.id === Number(selectedCategory))
    : products;

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories</p>;

  return (
    <>
    <div className="bg-[#192231] px-5 flex justify-between items-center mt-4">
    <h1 className="text-4xl font-serif py-3 text-cyan-300  font-semibold underline"> Cotogories</h1>
      <select onChange={(e) => setSelectedCategory(e.target.value)} className='py-2 px-3 cursor-pointer border-0 outline-0 text-[20px] font-semibold rounded-lg'>
        <option value="">Select a Category</option>
          {categories.length > 0 ? (
                      categories
            .filter((category) => category.id < 6)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
        ) : (
          <option disabled>No categories available</option>
        )}

      </select>
   </div>

      <div className="flex justify-center items-center py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-6">
          {filterProduct.map((items) => (
            <div key={items.id} className="min-h-[300px] w-[300px] bg-[#111827] rounded-lg flex justify-center items-center flex-col px-2 text-white py-4 gap-y-3 hover:scale-105 transition-all">
          
              <img 
                src={ items.images || "https://rb.gy/olmcee"} 
                alt={items.title} 
                width={200} 
                className="rounded-md hover:scale-90 transition-all"
              />
              
              <p className="font-mono text-xl font-semibold text-center ">{items.title}</p>
              <span className="text-xl capitalize font-serif font-semibold text-cyan-500">Price: {items.price}</span> 
              <button className="text-xl py-2 px-3 bg-cyan-400 border-4 border-transparent hover:bg-transparent hover:border-red-800 transition-all rounded-md font-serif font-semibold">Order</button>
            </div>
          ))} 
        </div>
      </div>
    </>
  );
};

export default Categories;
