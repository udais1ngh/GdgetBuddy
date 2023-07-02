import styled  from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { CartCont } from "./CardContext";
import { toast} from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import { useInView } from 'react-intersection-observer';

const BoxWrap=styled.div`



  @media screen and (min-width:768px){
    transform: scale(1);
transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.06);
  }
    
    }

`;
const Box=styled(Link)`
background-color:white;
padding:20px;
height:200px;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center;
img{
    max-width:100%;
    max-height:100px;
}
`;

const Title=styled.h2`
font-weight:normal;
font-size:.8rem;
text-align:center;
margin-top:4px;

`;
const PriceRow=styled.div`
display:flex;
gap:6px;
align-items:center;
justify-content:center;
margin-top:5px;
`;



export default function Cards({_id,title,description,price,images}){
const {addProduct}= useContext(CartCont);
const {ref, inView} = useInView({
  threshold: 0.1
});
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


<BoxWrap ref={ref} className={inView ?  'boxanimate' : ' boxwrap'} >

<Box href={'/product/'+_id}>
    <img src={images[0]} alt=""/>
</Box>
<Title>{title}</Title>
<PriceRow>
    <div className="text-2xl font-semibold">
    ₹{price}
    </div>
<div className="flex justify-center text-center">

<button  className="text-green-700 border active:bg-gray-200 border-green-700   font-medium rounded-md text-sm px-2.5 py-1.49 text-center hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 "   onClick={()=>AddToCart(_id)}  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-5">
  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
</svg>
</button>

</div>
</PriceRow>

</BoxWrap>


)

}




