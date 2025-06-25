import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../index.css'
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const Addproduct = () => {

    const baseURL = 'http://localhost:5004';
    // const baseURL = 'https://server-ecom-rho.vercel.app';
    const [allcategory, setAllcategory] = useState([]);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        description: "",
        productImg: "",
        categoryId: ""
    })
    const navigate = useNavigate()
    const [category, setCategory] = useState({
        categoryName: "",
        description: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(formData)
    }

    const addProduct = async () => {
        const { productName, productImg, price, description, categoryId } = formData;
        try {
            let res = await axios.post(`${baseURL}/products`, {
                productName,
                productImg,
                price,
                categoryId,
                description
            })
            toast.success(" SuccesFully Added Product");
            setFormData({
                productImg: "",
                productName: "",
                price: "",
                categoryId: "",
                description: "",
            })
            setTimeout(() => navigate("/product") , 1500)
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
    const handleCategory = (e) => {
        let { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const fetchCategory = async () => {
        try {
            const res2 = await axios.get(`${baseURL}/allcategories`);
            setAllcategory(res2.data);
        } catch (error) {
            toast.error(error.response?.data?.message);
            
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])

    
    const addCategory = async () => {
        const { categoryName, description } = category;
        try {
            let res = await axios.post(`${baseURL}/category`, {
                categoryName,
                description
            })
            fetchCategory();
            setCategory({
                categoryName: "",
                description: ""
            })
            console.log(res.data.message, "res.data.message");
            toast.success(res.data.message); 
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };


    const input = 'border rounded-md outline-none py-3 px-4 font-poppins text-black w-full'
    const btn = 'py-2 px-4 text-white rounded bg-green-500 active:scale-95 transition duration-2';
    return (
        <>
            <div>
                <Toaster position="top-center" richColors />
                <div className='font-poppins h-screen flex flex-col gap-y-5 md:flex-row justify-evenly items-center py-10 '>
                    <div className='bg-gray-100 min:h-[400px] w-[400px] flex justify-center items-center flex-col gap-y-3 px-4 py-4 border rounded-md capitalize' >
                        <h1 className='text-green-500 font-semibold '>add Product</h1>
                        <input
                            type="text"
                            value={formData.productName}
                            placeholder='productName'
                            name='productName'
                            className={input}
                            onChange={handleChange} />
                        <input
                            value={formData.productImg}
                            type="text" placeholder='productImg' name='productImg' className={input} onChange={handleChange} />
                        <input
                            value={formData.price}
                            type="number" placeholder='price' name='price' className={input} onChange={handleChange} />
                        <select
                            name='categoryId'
                            value={formData.categoryId}
                            onChange={handleChange}
                            className={input} >
                            <option value="">Select a category</option>
                            {allcategory.map((cat) => (
                                <option value={cat.category_id} key={cat.category_id} >
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={formData.description}
                            placeholder='Product description' name='description' className={input} onChange={handleChange} />

                        <button type='submit' onClick={addProduct} className={btn}>Add product</button>
                    </div>

                    <div className='h-[400px] w-[400px] flex justify-center items-center flex-col gap-y-3 px-4 py-4 border rounded-md capitalize bg-gray-100 shadow-inner'>
                        <h1 className='text-green-500 font-semibold '>category</h1>
                        <input type="text"
                            placeholder='Category Name'
                            className={input}
                            name='categoryName'
                            value={category.categoryName}
                            onChange={handleCategory}
                        />
                        <textarea
                            type="text"
                            placeholder='Category Description'
                            className={input}
                            value={category.description}
                            name='description'
                            onChange={handleCategory}
                        />
                        <button type='submit' onClick={addCategory} className={btn}>Add Category</button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Addproduct
