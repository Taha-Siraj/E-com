import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import {  useNavigate } from 'react-router-dom';
const App = () => {

    const baseURL = 'https://server-ecom-rho.vercel.app';
    const [allcategory, setAllcategory] = useState([]);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        description: "",
        productImg: "",
        categoryId: ""
    });
    const [category, setCategory] = useState({
        categoryName: "",
        description: ""
    });
    const fetchCategory = async () => {
        try {
            const res = await axios.get(`${baseURL}/allcategories`);
            setAllcategory(res.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch categories.");
            console.error("Fetch Category Error:", error);
        }
    };

    let navigate = useNavigate()
    const addProduct = async () => {
        const { productName, productImg, price, description, categoryId } = formData;
        if (!productName || !price || !categoryId || !description) {
            toast.error("Please fill all required product fields.");
            return;
        }
        try {
            await axios.post(`${baseURL}/products`, {
                productName,
                productImg,
                price,
                categoryId,
                description
            });
            toast.success("Successfully added product!");
            setFormData({
                productName: "",
                price: "",
                description: "",
                productImg: "",
                categoryId: ""
            });
            setTimeout(() => {navigate("/product")} , 1500)
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding product.");
            console.error("Add Product Error:", error);
        }
    };

    const addCategory = async () => {
        const { categoryName, description } = category;
        if (!categoryName || !description) {
            toast.error("Please fill all category fields.");
            return;
        }
        try {
            const res = await axios.post(`${baseURL}/category`, { categoryName, description });
            toast.success(res.data.message || "Category added successfully!");
            fetchCategory();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding category.");
            console.error("Add Category Error:", error);
        }
    };
    useEffect(() => {
        fetchCategory();
    }, []);
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    
    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };



    const cardStyles = "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 w-full";
    const inputStyles = "bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full p-3 transition duration-300 placeholder-gray-400";
    const buttonStyles = "w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform duration-200 active:scale-95";
    const titleStyles = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-6 text-center";


    return (
        <>
            <div className='min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8'>
                <Toaster position="top-center" richColors theme="dark" />

                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-white">Product Dashboard</h1>

                <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10'>

                    <div className={cardStyles}>
                        <h2 className={titleStyles}>Add New Product</h2>
                        <div className='flex flex-col gap-y-4'>
                            <input type="text" value={formData.productName} placeholder='Product Name' name='productName' className={inputStyles} onChange={handleProductChange} />
                            <input type="text" value={formData.productImg} placeholder='Product Image URL' name='productImg' className={inputStyles} onChange={handleProductChange} />
                            <input type="number" value={formData.price} placeholder='Price' name='price' className={inputStyles} onChange={handleProductChange} />
                            <select name='categoryId' value={formData.categoryId} onChange={handleProductChange} className={inputStyles}>
                                <option value="">Select a category</option>
                                {Array.isArray(allcategory) && allcategory.map((cat) => (
                                    <option value={cat.category_id} key={cat.category_id} className="bg-gray-800 text-white">
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                            <textarea placeholder='Product Description' value={formData.description} name='description' className={`${inputStyles} min-h-[100px]`} onChange={handleProductChange} />
                            <button type='button' onClick={addProduct} className={buttonStyles}>Add Product</button>
                        </div>
                    </div>

                    <div className={cardStyles}>
                        <h2 className={titleStyles}>Add New Category</h2>
                        <div className='flex flex-col gap-y-4'>
                            <input type="text" placeholder='Category Name' className={inputStyles} name='categoryName' value={category.categoryName} onChange={handleCategoryChange} />
                            <textarea placeholder='Category Description' className={`${inputStyles} min-h-[100px]`} value={category.description} name='description' onChange={handleCategoryChange} />
                            <div className="flex-grow"></div> 
                            <button type='button' onClick={addCategory} className={`${buttonStyles} mt-auto`}>Add Category</button>
                        </div>
                    </div>
                </div>

                <div className={`${cardStyles} max-w-6xl`}>
                     <h2 className={titleStyles}>Available Categories</h2>
                     <div className="overflow-x-auto relative rounded-lg border border-gray-700">
                        <table className='w-full text-sm text-left text-gray-300'>
                            <thead className='text-xs text-gray-400 uppercase bg-gray-700/50'>
                                <tr>
                                    <th scope="col" className='px-6 py-3'>ID</th>
                                    <th scope="col" className='px-6 py-3'>Category Name</th>
                                    <th scope="col" className='px-6 py-3'>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(allcategory) && allcategory.length > 0 ? (
                                    allcategory.map((eachCategory) => (
                                    <tr key={eachCategory.category_id} className='bg-gray-800/60 border-b border-gray-700 hover:bg-gray-700/80 transition-colors duration-200'>
                                        <td className='px-6 py-4 font-mono text-green-400'>{eachCategory?.category_id}</td>
                                        <td className='px-6 py-4 font-medium text-white'>{eachCategory?.category_name}</td>
                                        <td className='px-6 py-4'>{eachCategory?.description}</td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-8 text-gray-500">
                                            No categories found. Add one above!
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

