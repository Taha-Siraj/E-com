import axios from 'axios'
import React, { useState } from 'react'

const Addproduct = () => {

    const baseURL = 'http://localhost:5004';
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        description: "",
        productImg: "",
        categoryId: ""
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
        try {
            let res = await axios.post(`${baseURL}/products`, {

            })
        } catch (error) {

        }
    }
    const input = 'border outline-none py-2 px-4 font-poppins text-black'
    return (
        <>
        <div className='font-poppins'>
            <div>
            <h1>add Product</h1>
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
            <input
                value={formData.categoryId}
                type="number" placeholder='categoryId' name='categoryId' className={input} onChange={handleChange} />
            <input
                type="text"
                value={formData.description}
                placeholder='description' name='description' className={input} onChange={handleChange} />
        </div>

        <div>
            <h1>category</h1>
            <input type="text" placeholder='categoryName' className={input} />
            <input type="text" placeholder='description' className={input} />
        </div>
        </div>
        </>
    )
}

export default Addproduct
