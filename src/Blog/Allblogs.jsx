import React from 'react'

const Allblogs = () => {


    const blogs = [{
    img: 'lifestyle.webp',
    title: 'Lifestyle',
    desc: 'Office rental agency or direct? Which is best when renting an office?',
    date: 'February 19, 2025', 
  },
  {
    img: 'socialmedia.webp',
    title: 'Social Media',
    desc: 'Lotus Electronics – New Store Launch in Bhilai, Chhattisgarh',
    date: 'February 19, 2025', 
  },     
  {
    img: 'company.webp',
    title: 'Company News',
    desc: 'We Invite You to These Wonderful Wine Tasting Events',
    date: 'February 19, 2025', 
  },     
  {
    img: 'elctronics.webp',
    title: 'Electronics',
    desc: '10 French Wine Regions to Visit for Amazing Views and Delicious Vinos',
    date: 'February 19, 2025', 
  },     
    ]
  return (
    <div className='py-24 font-poppins px-10'>
      <h1 className='text-2xl py-3'>Our Blogs</h1>
      <div className='grid grid-cols-4 py-10 '>
        {blogs.map((blog, index) => (
        <div key={index} className='flex h-[350px] w-[300px] gap-x-5 flex-col justify-center items-center px-4 py-4'>
                <img src={blog.img} alt={blog.title} className='w-full rounded-lg' />
                <div className='flex justify-center items-center gap-x-3'>
                <h2 className='text-sm text-green-950 font-semibold'>{blog.title}</h2>
                <p className=' text-sm text-green-950 mt-2'>{blog.date}</p>
                </div>
                <p className='text-gray-900'>{blog.desc}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Allblogs
