import React from 'react'
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter , BsLinkedin } from "react-icons/bs";

const Fotter = () => {
  return (
    <div>
       <Footer container >
      <div className="w-full bg-[#1F2937] text-white py-4 px-5 capitalize no-underline font-mono">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <h1 className='text-5xl font-serif font-extrabold text-[#8E44AD]'>My store</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className=''>
              <Footer.Title title="about" />
              <Footer.LinkGroup col >
                <Footer.Link href="#" className='underline-offset-4 text-xl'>Home</Footer.Link>
                <Footer.Link href="#"  className='underline-offset-4  text-xl'>Product </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className='underline-offset-4 text-xl'>Instagram</Footer.Link>
                <Footer.Link href="#" className='underline-offset-4 text-xl'>Linkdin</Footer.Link>
                <Footer.Link href="#" className='underline-offset-4 text-xl'>Facebook</Footer.Link>
                <Footer.Link href="#"><span className='underline-offset-4 text-xl '>Discord</span></Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className='underline-offset-4 text-xl'>Privacy Policy</Footer.Link>
                <Footer.Link href="#" className='underline-offset-4 text-xl'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Designed By Taha Siraj" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-3xl" >
            <Footer.Icon href="#" className='text-[#0866FF]' icon={BsFacebook} />
            <Footer.Icon href="#" className='text-[#F402D1]' icon={BsInstagram} />
            <Footer.Icon href="#" className='text-gray-950' icon={BsTwitter} />
            <Footer.Icon href="#" className='text-black' icon={BsGithub} />
            <Footer.Icon href="#"  className="text-[#0077B0]" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
    </div>
  )
}

export default Fotter
