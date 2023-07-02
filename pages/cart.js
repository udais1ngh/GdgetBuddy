import Center from "@/components/center";
import Header from "@/components/header";
import { Button } from "@mui/material";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from "react";
import { CartCont } from "@/components/CardContext";
import axios from "axios";
import Table from "@/components/table";
import Spinner from "@/components/spinner";
import { useSession } from "next-auth/react";



const ColumnWrapper = styled.div`
display:grid;
grid-template-columns:1fr;
gap:40px;
margin-top:40px;
@media screen and (min-width:768px){

    grid-template-columns:1.3fr .7fr;
}
`;

const Box = styled.div`
background-color:#fff;
border-radius:10px;
padding:30px;
`;



const CartImage =styled.div`
img{

    max-height:100px;
max-width:100px;

}

@media screen and (min-width:768px){

    img{

        max-height:100px;
    max-width:100px;
    
    }

}

`;
const Input = styled.input`

width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
  font-family:inherit;


`;

export default function Cart() {
   
    const buttonStyle = {
        backgroundColor: '#222',
        color: 'white',
        
    };

    const {data:session} = useSession();
    
    const { cartProducts ,setCartProducts,addProduct,removeProduct,clearCart} = useContext(CartCont);

    const [cartP, setcartP] = useState()



const [totalCartItems,setTotalCartItems]=useState([]);

const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[city,setCity]=useState('');
const[postalcode,setPostalcode]=useState('');
const[streetAdd,setStreetAdd]=useState('');
const[country,setCountry]=useState('');
const [issuccess,setIsSuccess]=useState(false);
const [loaded, setLoaded] = useState(false);
const [loaded1, setLoaded1] = useState(false);


    useEffect(() => {
        if (cartProducts.length > 0) {

            axios.post('/api/cart', { ids: cartProducts }).then(response => {
                const { cProd } = response.data;
                console.log(cProd);
                setTotalCartItems(cProd);
                const uniqueProductIds = new Set();

                // Filter out duplicate elements with the same ID
                const filteredProducts = cProd.filter((product) => {
                    if (!uniqueProductIds.has(product._id)) {
                        uniqueProductIds.add(product._id);
                        return true;
                    }
                    return false;
                });

                console.log(filteredProducts);

                setcartP(filteredProducts);
                setLoaded1(true)
            })

        }else{
            setcartP([]);
        }

        setLoaded1(false);
    }, [cartProducts]);


useEffect(()=>{
if(typeof window === 'undefined'){
    return;
}

    if( window?.location.href.includes('success')){
        setIsSuccess(true);
clearCart();
console.log(cartProducts);
localStorage.clear();
    }

    

        

},[])

useEffect(() => {
    if (!session) {
      return;
    }

    axios.get('/api/address').then(res => {
        if(res.data !== null){

            setName(res.data.name );
            setEmail(res.data.email );
            setCity(res.data.city );
            setPostalcode(res.data.postalcode );
            setStreetAdd(res.data.streetAdd );
            setCountry(res.data.country);
            setLoaded(true);
        }
        else{
            setName("");
            setEmail("");
            setCity("");
            setPostalcode( "");
            setStreetAdd( "");
            setCountry("");
            setLoaded(true);

        }
    })

    setLoaded(false);


  }, [session]);



function moreProduct(id){

addProduct(id);

}

function lessProduct(id){
removeProduct(id);
}

 async function goToPayment(){

 const response = await axios.post('/api/checkout',{
    name,email,city,postalcode,streetAdd,country,cartProducts
})

if(response.data.url){
    window.location = response.data.url
}
}
 
if(issuccess){
    return(
        <>
        <Header/>
        <Center>
<ColumnWrapper>
<Box>
<h1 className="text-4xl font-bold">
    Order Succesful!
</h1>
<h1>
    We will email you about order status.
</h1>
</Box>
</ColumnWrapper>
        </Center>

        
        </>
    )
}

    return (

        <>
            <Header />

            <Center>
                <ColumnWrapper>
                    <Box>
                        <h2 className="text-xl font-semibold text-center m-2">Cart</h2>
                        {
                           !loaded1 && !cartProducts?.length && (
                                <div>Cart Is Empty!</div>
                            )
                        }

                        {
                            cartP?.length > 0 && loaded1 && (

                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Product
                                            </th>
                                            <th>
                                                Quantity
                                            </th>
                                            <th>
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {
                                            cartP.map(p => (
                                                <tr key={p.images[0]}>
                                                    <td className="flex h-32 flex-col  justify-center items-center shadow rounded-md p-2 sm:p-0">
                                                        <CartImage>
                                                            <img  src={p.images[0]} />
                                                            </CartImage>
                                                        {p.title}
                                                    </td>
                                                    <td className="text-center ">
                                                        <div className="flex gap-1 justify-center items-center">
                                                        
                                                        <button onClick={()=>lessProduct(p._id)} className="bg-white text-black  active:bg-gray-200 font-bold uppercase text-xs px-3 py-2 rounded hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">-</button>
  

                                                    <div>
                                                    {
                                                        cartProducts.filter(id => id === p._id).length
                                                        
                                                        }
                                                    </div>
                                                      
                                                        <button onClick={()=>moreProduct(p._id)} className="bg-white text-black   active:bg-gray-200 font-bold uppercase text-xs px-3 py-2 rounded  hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" >+</button>
                                                        </div>
                                                  
                                                        </td>
                                                       
                                                    <td className="text-center  ">₹{cartProducts.filter(id => id === p._id).length * p.price}</td>
                                                </tr>

                                            ))
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><span className="font-semibold">Shipping Fee:₹100</span></td>
                                        </tr>
<tr>
    <td></td>
    <td></td>
    <td  className="font-semibold"><span>Total:</span>₹{totalCartItems.reduce((acc, item) => acc + item.price, 0) + 100}</td>
</tr>
                                    </tbody>

                                </Table>

                            )
                        }

{
    !loaded1 && cartProducts?.length > 0 && (

        <Box>
            <Spinner/>
        </Box>
        
        )
}
                    </Box>
                   
                    {
                        !!cartProducts?.length && loaded && (
                            <Box>
                                <h2 className="text-xl font-semibold  text-center m-2">Order Information</h2>
                                
                                <div className="flex flex-col gap-4 justify-center items-center ">
                                <Input type="text" placeholder="Name" value={name} onChange={ev => setName(ev.target.value)} name="name" />
                                    <Input type="email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)} name="email" />
                                    <div className="flex gap-1">
                                        <Input type="text" placeholder="city" value={city} onChange={ev => setCity(ev.target.value)} name="city" />
                                        <Input type="text" placeholder="Postal Code" value={postalcode} onChange={ev => setPostalcode(ev.target.value)} name="postalcode" />
                                    </div>

                                    <Input type="text" placeholder="Street Address" value={streetAdd} onChange={ev => setStreetAdd(ev.target.value)} name="streetAdd" />
                                    <Input type="text" placeholder="Country" value={country} onChange={ev => setCountry(ev.target.value)} name="country" />
                                    <div className="flex  justify-center items-center">
                                        <button className=" w-full m-auto text-white  bg-blue-700  hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"


                                            onClick={goToPayment}>CheckOut</button>



                                    </div>
                                </div>
                                
        
                            </Box>

                        )
                    }{

                        !loaded && !session && (

<Box>

<h1 className="text-xl font-semibold text-center">Please LogIn For CheckOut.</h1>

</Box>

                        )
                    }
                    {
                        !loaded && session && (

<Spinner/>

                        )
                    }
                </ColumnWrapper>
            </Center>

        </>
    )

}



//<input type="hidden" name="productss" value={cartProducts.join(',')}/>
