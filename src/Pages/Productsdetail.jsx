import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className="mt-24 font-poppins px-10 py-2">
      <h1 className="text-2xl font-semibold mb-4">Product Details</h1>
      <img src={product.product_img} alt={product.product_name} className="w-64 h-64 object-cover" />
      <h2 className="text-xl mt-4">{product.product_name}</h2>
      <p className="text-lg text-green-600 font-bold mt-2">Rs. {product.price}</p>
      <p className="mt-2 text-gray-700">Category: {product.category_name}</p>
      <p className="mt-4 text-sm text-gray-600">{product.description || "No description available."}</p>
    </div>
  );
};

export default ProductDetail;
