import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MoonLoader } from "react-spinners"


const Product = () => {
    const fetchProduct = async () => {
        let res = await axios.get("https://api.escuelajs.co/api/v1/products")
       return res.data
    }
   
      const { data, error, isLoading } = useQuery({
        queryKey: "products",
        queryFn: fetchProduct,
      });

   
    console.log(data)
  
  return(
    <>
   <div>
   <h1 className="text-5xl font-serif py-3 text-center font-semibold underline" >Our Product</h1>

   
    {(isLoading) ? (

      <p className="h-screen flex justify-center items-center"><MoonLoader /></p> 
    ):
    (error) ? (

      <p>errorr...</p>
    ):
    (
     <div className="flex justify-center items-center py-4">
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
    {data.map((items , index) => (
    <div key={index} className=" min-h-[300px] w-[300px] bg-[#dadada] rounded-lg flex justify-center items-center  flex-col px-2 py-4 gap-y-3">
      <img src={items.images} alt=""  width={200} className="rounded-md "/>
      <p className="font-mono text-xl  font-semibold text-center">{items.title}</p>
       <span className="text-xl capitalize font-serif font-semibold text-slate-900">price: {items.price}</span> 
       <button className="text-xl py-2 px-3 bg-cyan-400 border-4 border-transparent hover:bg-transparent hover:border-red-800 transition-all rounded-md font-serif font-semibold">
  Order
</button>
    </div>
     ))} 
   </div>
     </div>
   )
  }
   </div>
  

    </>
  )
}

export default Product
