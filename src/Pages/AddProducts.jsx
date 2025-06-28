import React from 'react'

const AddProducts = () => {



  const inputStyle = 'border-[0.5px] py-3 px-4 rounded-md placeholder:text-gray-300 w-full border-[#dadada6e] bg-gray-700 outline-none focus:border-gray-300 transition-all duration-75'
  return (
    <div>
      <form className='flex justify-center flex-col items-center h-[400px] w-[400px] bg-gray-900 text-[#fff]  font-poppins px-6 py-6'>
        <h1>Add Product</h1>
        <input type="text" placeholder='Product Name' className={inputStyle} />
        <input type="text" placeholder='Product Name' className={inputStyle} />
      </form>
    </div>
  )
}

export default AddProducts
