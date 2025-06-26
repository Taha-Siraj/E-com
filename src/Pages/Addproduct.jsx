import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../index.css'
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const Addproduct = () => {

    // const baseURL = 'http://localhost:5004';
    const baseURL = 'https://server-ecom-rho.vercel.app';
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
            setTimeout(() => navigate("/product"), 1500)
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }
    const handleCategory = (e) => {
        let { name, value } = e.target;
        console.log(name, value)
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


    const input = 'bg-gray-700  border-[#dadada3f]  capitalize text-[18px] border-[0.5px] rounded-md outline-none py-3 px-4 font-poppins text-gray-300 w-full'
    const btn = 'py-2 px-4 text-white rounded bg-green-500 active:scale-95 transition duration-2';
    return (
        <>
            <div className='bg-slate-800 font-poppins'>
                <Toaster position="top-center" richColors />
                <div className='font-poppins h-screen flex flex-col gap-y-5 md:flex-row justify-evenly items-center py-10 '>
                    <div id='nav' className='border-[0.5px] min:h-[400px] w-[400px] flex justify-center items-center flex-col gap-y-3 px-4 py-4 border-[#dadada3f] rounded-lg capitalize' >
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

                    <div className='border-[0.5px] border-[#dadada36] h-[400px] w-[400px] flex justify-center items-center flex-col gap-y-3 px-4 py-4  rounded-md capitalize bg-gray-100 shadow-inner' id='nav'>
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

                <div className='flex justify-center items-center py-6'  >
                    <table className='border px-2 py-2'>
                        <thead>
                            <tr>
                                <th className='p-3 border  text-xl uppercase text-yellow-900 text-center' >Category id</th >
                                <th className='p-3 border  text-xl uppercase text-yellow-900 text-center' >Category Name</th >
                                <th className='p-3 border text-xl uppercase text-yellow-900 text-center' >Description</th >
                            </tr>
                        </thead>
                                <tbody>
                    {allcategory.map((eachCategory , i) => {
                        return(
                        <tr>
                            <td   className='p-3  border text-xl font-poppins capitalize text-center text-green-600'>{eachCategory?.category_id}</td>
                            <td   className='p-3  border text-xl font-poppins capitalize text-center text-cyan-400 '>{eachCategory?.category_name}</td>
                            <td  className='text-cyan-400 p-3 border text-xl font-poppins capitalize text-center' >{eachCategory?.description}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Addproduct
