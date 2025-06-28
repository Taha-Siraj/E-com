import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner';

const AddProducts = () => {
  
  const baseUrl = 'https://server-ecom-rho.vercel.app';
  const [productform, setproductform] = useState({
    productName: "",
    price: "",
    description: "",
    categoryId: "",
    productImg: "",
  })
  const [allcategories , setAllcategory] = useState([]);
  const [allproducts , setallproducts] = useState([]);

  const handleChange = (e) => {
    const {name , value} = e.target;
    setproductform((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log(name, value)
  }
    const fetchCategory = async () => {
    try {
      let res = await axios.get(`${baseUrl}/allcategories`);
      setAllcategory(res.data)
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }
  const fetchProducts = async () => {
    try {
      let res =  await axios.get(`${baseUrl}/allproducts`);
      setallproducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCategory();
    fetchProducts();
  },[])

  const addproduct = async (e) => {
    e.preventDefault();
    let {productName, price, description, categoryId, productImg} = productform;
    if(!productName || !price || !description || !categoryId || !productImg){
      toast.warning("All Field are Requried");
      return;
    }
    try {
      let res = await axios.post(`${baseUrl}/products`,{
        productName,
        price,
        description,
        productImg,
        categoryId
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }  


  const inputStyle = 'border-[0.5px] py-3 px-4 rounded-md placeholder:text-gray-300 w-full border-[#dadada6e] bg-gray-700 outline-none focus:border-gray-300 transition-all duration-75';
  const titleStyles = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500  text-center";
  return (
    <div className='bg-gray-950 py-10 min:h-screen flex justify-center items-center flex-col gap-y-10'>
      <Toaster position="top-center" richColors />
      <form onSubmit={addproduct} className='flex justify-center flex-col border-[#dadada6e] items-center border-[0.5px] rounded-lg min:h-[400px] w-[400px] bg-gray-800 text-[#fff] gap-y-3 font-poppins px-6 py-6'>
        <h1 className={titleStyles}>Add Product</h1>
        <input
        type="text"
        name='productName'
        onChange={handleChange}
        placeholder='Product Name' className={inputStyle} />
        <input
         type="number"
         name='price'
        onChange={handleChange}
         placeholder='Product price'
         className={inputStyle} />
        <input 
         type="text" 
         placeholder='Product description'
         name='description'
        onChange={handleChange}
         className={inputStyle} />
        <input 
        type="text" 
        name='productImg'
        onChange={handleChange}
        placeholder='Product Imgage URL' 
        className={inputStyle} />
        <select 
         className={inputStyle}
         name='categoryId'
         onChange={handleChange}>
         <option value="">Select A category</option>
          {allcategories.map((cat) => (
            <option key={cat.category_id} className={inputStyle} value={cat.category_id}> {cat.category_name} </option>
          ))} 
        </select>
        <button 
        className='bg-green-800 text-gray-300 font-semibold flex justify-center w-full rounded-lg py-2 px-4 items-center'>Add Product</button>
      </form>

      <div>
        {allproducts.map((eachProduct) => (
          <div key={eachProduct?.product_id} className='bg-gray-700 rounded-lg px-4 py-4 h-[350px] flex justify-center items-center font-poppins  flex-col text-balck
           text-start gap-y-4 capitalize border-[#dadada6e] border-[0.3px]'>
            <img src={eachProduct?.product_img} alt="" width={200} className='object-center rounded-lg' height={200}/>
            <pc className='text-[18px]' >Product Name: {eachProduct?.product_name}</pc>
            <p className='text-[17px] font-semibold text-green-700 '>RS:{eachProduct?.price}</p>
            <p>{eachProduct?.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddProducts
