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
  const [allAddProducts , setAllAddproducts] = useState([]);
  const [productId, setproductId] = useState("");
 
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
      console.log(res.data)
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }
  const fetchProducts = async () => {
    try {
      let res =  await axios.get(`${baseUrl}/allproducts`);
      setAllAddproducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addproduct = async (e) => {
    e.preventDefault();
    let {productName, price, description, categoryId, productImg} = productform;
    if(!productName || !price || !description || !categoryId || !productImg){
      toast.warning("All Field are Requried");
      return;
    }

    if(productId){
      try {
        let res = await axios.put(`${baseUrl}/product/${productId}`,{
          productName,
          price,
          description,
          productImg,
          categoryId
        })
        fetchProducts();
        setproductId("")  
        setproductform({
        productName: "",
        price: "",
        description: "",
        categoryId: "",
        productImg: "",
        })
        console.log(res.data)
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }
    else{
      try {
      let res = await axios.post(`${baseUrl}/products`,{
        productName,
        price,
        description,
        productImg,
        categoryId
      })
      fetchProducts();
      console.log(res.data)
    } catch (error) {
      console.log(error.response?.data?.message)
    }
    }
  }  

  const deletedProduct = async (id) => {
    try {
      let res = await axios.delete(`${baseUrl}/product/${id}`)
      console.log(res.data);
      fetchProducts()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCategory();
    fetchProducts();
  },[])


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
         value={productform.productName}
         onChange={handleChange}
         placeholder='Product Name' className={inputStyle} />
        <input
         type="number"
         name='price'
         value={productform.price}
        onChange={handleChange}
         placeholder='Product price'
         className={inputStyle} />
        <input 
         type="text" 
         value={productform.description}
         placeholder='Product description'
         name='description'
         onChange={handleChange}
         className={inputStyle} />
        <input 
        type="text" 
        name='productImg'
        onChange={handleChange}
        value={productform.productImg}
        placeholder='Product Imgage URL' 
        className={inputStyle} />
        <select 
         className={inputStyle}
         name='categoryId'
         value={productform.categoryId}
         onChange={handleChange}>
         <option value="">Select A category</option>
          {allcategories.map((cat) => (
            <option key={cat.category_id} className={inputStyle} value={cat.category_id}> {cat.category_name} </option>
          ))} 
        </select>
        <button 
        className='bg-green-800 text-gray-300 font-semibold flex justify-center w-full rounded-lg py-2 px-4 items-center'>{productId? "update Product" : "Add Product"}</button>
      </form>

      <div className='flex justify-center flex-col gap-y-10 px-5 flex-wrap items-center gap-x-8 md:flex-row'>
        {allAddProducts.map((eachProduct) => (
          <div key={eachProduct?.product_id} className='bg-gray-700 rounded-lg px-4 py-6 min:h-[350px] flex justify-center items-center font-poppins text-gray-300 flex-col text-balck
           text-start gap-y-4 capitalize border-[#dadada6e] border-[0.3px]'>
            <img src={eachProduct?.product_img} alt="" width={150} className='object-center rounded-lg' height={150}/>
            <p className='text-[18px]' >Product Name: {eachProduct?.product_name}</p>
            <p className='text-[17px] font-semibold text-green-700 '>RS:{eachProduct?.price}</p>
            <p>description: {eachProduct?.description}</p>
            <div className='flex justify-center items-center flex-col gap-y-2 w-full gap-x-2'>
              <button className='bg-green-800 text-gray-300 font-semibold flex justify-center w-full rounded-lg py-2 px-4 items-center'
              onClick={() => {setproductId(eachProduct?.product_id);
                setproductform({
                  productName: eachProduct?.product_name,
                  price: eachProduct?.price,
                  description: eachProduct?.description,
                  productImg: eachProduct?.product_img,
                  categoryId: eachProduct?.category_id
                })
                }}>Edit Product</button>
              <button onClick={() => deletedProduct(eachProduct?.product_id)} className='bg-red-800 text-gray-300 font-semibold  justify-center w-full rounded-lg py-2 px-4 '>Delete Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddProducts
