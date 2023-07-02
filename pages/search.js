import ProductGrid from "@/components/ProductGrid";
import Center from "@/components/center";
import Header from "@/components/header";
import Spinner from "@/components/spinner";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`

width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
  font-family:inherit;


`;

const InputWrapper = styled.div`
position:sticky;
top:5px;
margin:20px 0;
padding:5px 0;
background-color:#eeeeeeaa;
`;


export default function Search(){
    const[searchText,setSearchText] = useState('');
    const [products,setProducts] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(()=>{

if(searchText.length > 0){
    setLoading(true)
axios.get('/api/filter?searchText=' +encodeURIComponent(searchText)).then(response=>{

    setProducts(response.data);
    setTimeout(()=>{

        setLoading(false);

    },1000);
});

}else{
    setProducts([])
}

    },[searchText]);

return(
    <>

<Header/>
    <Center>

<InputWrapper>
<Input type="text" placeholder="Search Products..." autoFocus value={searchText} onChange={ev=>setSearchText(ev.target.value)}/>
</InputWrapper>

{
searchText != '' && products.length === 0 && (
        <h2>No Products found.</h2>
    )
}
<div>
    {
        loading && (

<Spinner/>

        )
    }
    {
        !loading && products.length > 0  && (
            <ProductGrid products={products}/>
        )
    }
  
</div>

    </Center>

    </>
   
)


}