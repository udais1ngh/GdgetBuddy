import { CartCont } from "@/components/CardContext";
import ProductImages from "@/components/ProductImg";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Button } from "@mui/material";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const ColWrapper=styled.div`
display:grid;
grid-template-columns:1fr;
gap:40px;
margin-top:40px;
margin-bottom:40px;
@media screen and (min-width:768px){

  grid-template-columns:.6fr 1.4fr;

}
`;


const Boxx=styled.div`
background-color:white;
padding:20px;
border-radius:10px;

`


export default function ProductPage({singleProduct}){
    const buttonStyle1 = {
        backgroundColor: '#1f9212', 
        color: 'white', 
      };

      const {addProduct} = useContext(CartCont);

      const notify = () => {
  

        toast.success("Added To Cart!", {
          position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
        });
      }

      function AddToCart(_id){
        notify();
        addProduct(_id);
        
        }

return(
<>
<Header/>
<Center>
<ColWrapper>
<Boxx>
<ProductImages  images={singleProduct.images}/>
</Boxx>

<div>
<h1 className="font-medium mt-2 mb-1 text-4xl">{singleProduct.title}</h1>
<p>{singleProduct.description}</p>

<div className="flex flex-col gap-2 py-2 ">

<h1 className="font-medium  text-xl">₹{singleProduct.price}</h1>

<button className="flex justify-center items-center gap-3 w-full text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>AddToCart(singleProduct._id)} >Add to Cart <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</button>
</div>

</div>
</ColWrapper>
</Center>
</>
    
)

}



export   async function getServerSideProps(context){
await mongooseConnect();

const {id}=context.query;

const product=await Product.findById(id);


return{
props:{

singleProduct:JSON.parse(JSON.stringify(product)),

}

}

}