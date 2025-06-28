import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner';
import Loader from './Loader';
const Addproduct = () => {
    const baseUrl = 'https://server-ecom-rho.vercel.app';
    const [CategoryForm, setCategoryForm] = useState({
        categoryName: "",
        description: "",
    });
    const [allcategories, setAllcategory] = useState([]);
    const [CategoryID, setCategoryID] = useState("");
    const [loader , setloader] = useState(false);
    const formRef = useRef(null);
    const handlecategoryChange = (e) => {
        let {name, value} = e.target
        setCategoryForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const fetchCategory = async () =>{
        try {
            let getCategory = await axios.get(`${baseUrl}/allcategories`);
            setAllcategory(getCategory.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCategory();
    } , []);

    const handleFormCategory = async (e) => {
        e.preventDefault();
        const {categoryName, description} = CategoryForm;
        if(!categoryName || !description){
             toast.warning('All Field Requried!');
            return;
        }
        if(CategoryID){
            try {
                setloader(true)
                let res1 = await axios.put(`${baseUrl}/category/${CategoryID}`,{
                    categoryName,
                    description
                })
                fetchCategory();
                toast.success('Category Updated Successfully!');
                console.log("res1.data", res1.data);
                setCategoryID("")
                setCategoryForm({categoryName: "" , description: ""})
                setloader(false)
            } catch (error) {
                toast.error('Something went wrong!');
                console.log("Edit Err",error)   
                setloader(false)
        }
    }
    else{
        try {
            setloader(true)
            let res2 = await axios.post(`${baseUrl}/category`, {
            categoryName,
            description
        })
        fetchCategory();
        toast.success('Category Added Successfully!');
            console.log("res2.data", res2.data);
            setloader(false)
        } catch (error) {
            toast.error('Something went wrong!');
            console.log("Post Err",error)   
            setloader(false)
        }
        }
    }

    const deleteCategory = async (id) => {
       try {
        let res = await axios.delete(`${baseUrl}/deletedcategory/${id}`);
          toast.success('Category Deleted!');
          console.log(res.data);
          fetchCategory()
        } catch (error) {
            toast.error('Category did not Deleted!');
            console.log(error)
       }
    }

  const cardStyles = "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 w-full";
    const inputStyles = "bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 block w-full p-3 transition duration-300 placeholder-gray-400";
    const buttonStyles = "w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform duration-200 active:scale-95";
    const titleStyles = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-6 text-center";
    return (
    <div className='font-poppins'>
        <Toaster position="top-center" richColors />
        <div className={cardStyles} >
            <h1 className={titleStyles}>Add Category</h1>
            <form ref={formRef} onSubmit={handleFormCategory}>
            <input 
            type="text" 
            onChange={handlecategoryChange} 
            name='categoryName'
            value={CategoryForm.categoryName}
            placeholder='Category Name' 
            className={inputStyles} />
            <input
            type="text"
            onChange={handlecategoryChange}
            name='description'
            value={CategoryForm.description}
            placeholder='Category Description'
            className={inputStyles} />
            <button 
            className='bg-green-800 flex justify-center w-full rounded-lg py-2 px-4 items-center' >
            {loader ?  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin "></div> : CategoryID ? "Update": "Add Category"}
            
            </button>
            </form>
        </div>

        <div className="overflow-x-auto px-10 py-10">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-cyan-500 text-white">
            <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
            </thead>
            <tbody>
            {allcategories.map((eachCat) => (
                <tr key={eachCat.category_id} className="border-t">
                <td className="px-6 py-4 text-sm">{eachCat.category_name}</td>
                <td className="px-6 py-4 text-sm">{eachCat.description}</td>
                <td className="px-6 py-4 flex justify-center items-center gap-3">
                    <button
                    className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md text-sm"
                    onClick={() => {setCategoryID(eachCat.category_id); 
                    setCategoryForm({
                        categoryName: eachCat.category_name,
                        description: eachCat.description,
                    });
                    setTimeout(() => {formRef.current?.scrollIntoView({behavior: 'smooth'})} , 100)
                    }}
                    >
                    Edit
                    </button>
                    <button
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    onClick={() => deleteCategory(eachCat.category_id)}
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}
export default Addproduct
