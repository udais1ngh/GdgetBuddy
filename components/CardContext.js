import React,{ useEffect, useState } from "react";

import { useRouter } from 'next/router';
 export const CartCont = React.createContext({});

 export function CartContextProvider({ children }) {
    const router = useRouter();
const ls=typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState( []);
    
    useEffect(()=>{

if(cartProducts?.length > 0 ){
    ls.setItem('cart',JSON.stringify(cartProducts));
}

    },[cartProducts]);

useEffect(()=>{
if(ls && ls.getItem('cart')){
    setCartProducts(JSON.parse(ls.getItem('cart')));
}
},[]);


    function addProduct(productId){
        setCartProducts(prev=>[...prev,productId]);
    }
    
    function removeProduct(productId){
setCartProducts(prev=>{
    const pos=prev.indexOf(productId);
    if(pos !==-1){
      return prev.filter((value,index)=> index !== pos);
    }else{
        return prev;
    }
})
    }

    function clearCart(){
        setCartProducts([]);
        router.push('/cart');
        ls.clear();
    }


   return(
<CartCont.Provider value={{ cartProducts,setCartProducts,addProduct,removeProduct,clearCart }}>
        {children}
    </CartCont.Provider>
   ) 
    
}


