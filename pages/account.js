import Center from "@/components/center";
import Header from "@/components/header";
import Spinner from "@/components/spinner";
import axios from "axios";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AccOrders from "@/components/accountOrders";


const Wrapper = styled.div`
display:grid;
grid-template-columns:1fr;
gap:30px;
margin: 25px 0;
@media screen and (min-width:768px){
    grid-template-columns:0.8fr 1.2fr;
   
}


`;
const Box = styled.div`
background-color:#fff;
border-radius:10px;
padding:30px;
margin-top:20px;
`;
const Box2 = styled.div`
background-color:#fff;
border-radius:10px;
padding:30px;
margin-top:20px;
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

export default function Account() {
    const { data: session } = useSession();

    async function logout() {
        await signOut(
            {

                callbackUrl: process.env.NEXT_PUBLIC__URL,

            }

        )
    }
    async function login() {

        await signIn('google');

    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [streetAdd, setStreetAdd] = useState('');
    const [country, setCountry] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [order, setOrder] = useState([]);
    const [orderLoaded, setOrderLoaded] = useState(false);

    const notify = () => {


        toast.success("Address Saved!", {
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


    function SaveAddress() {
        const data = { name, email, city, postalcode, streetAdd, country };
        axios.put('/api/address', data);
        notify();


    }



    useEffect(() => {

        if (!session) {
            return;
        }



        axios.get('/api/address').then(res => {

            if (res.data !== null) {

                setName(res.data.name);
                setEmail(res.data.email);
                setCity(res.data.city);
                setPostalcode(res.data.postalcode);
                setStreetAdd(res.data.streetAdd);
                setCountry(res.data.country);
                setLoaded(true);
            }
            else {
                setName("");
                setEmail("");
                setCity("");
                setPostalcode("");
                setStreetAdd("");
                setCountry("");
                setLoaded(true);

            }

            console.log(res.data);
        })

        axios.get('/api/order').then(res => {

            setOrder(res.data);
            setOrderLoaded(true);

        })


        setLoaded(false);
        setOrderLoaded(false);

    }, [session])

    return (
        <>
            <Header />
            <Center>
                <Wrapper>

                    <Box>
                        <div>

                            {
                                session && (
                                    <div>
                                        <div className="text-center">
                                            <h1 className="text-xl font-medium"> Welcome {session.user.name}!</h1>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                )
                            }

                        </div>

                        <h1 className="text-3xl font-semibold text-center">Account Details</h1>

                        {
                            loaded && (
                                <div >
                                    <Input type="text" placeholder="Name" value={name} onChange={ev => setName(ev.target.value)} name="name" />
                                    <Input type="email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)} name="email" />
                                    <div className="flex gap-1">
                                        <Input type="text" placeholder="city" value={city} onChange={ev => setCity(ev.target.value)} name="city" />
                                        <Input type="text" placeholder="Postal Code" value={postalcode} onChange={ev => setPostalcode(ev.target.value)} name="postalcode" />
                                    </div>

                                    <Input type="text" placeholder="Street Address" value={streetAdd} onChange={ev => setStreetAdd(ev.target.value)} name="streetAdd" />
                                    <Input type="text" placeholder="Country" value={country} onChange={ev => setCountry(ev.target.value)} name="country" />
                                    <div className="flex justify-center items-center">
                                        <button className=" w-full m-auto text-white  bg-blue-700   hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"


                                            onClick={SaveAddress}>Save Address</button>



                                    </div>
                                </div>


                            )
                        }




                        {
                            !loaded && session && (

                                <Spinner />
                            )

                        }

                        {
                            !session && (

                                <h1 className=" text-md font-semibold text-center ">Please Login. </h1>

                            )

                        }
                        <div className="mt-2">
                            {
                                session && (

                                    <button className="text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"


                                        onClick={logout}>LogOut</button>

                                )

                            }

                            {
                                !session && (

                                    <button className=" flex justify-center items-center gap-3 w-full text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"


                                        onClick={login}>
                                        <span>LogIn with Google</span>
                                        <span><svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg></span></button>
                                )

                            }

                        </div>


                    </Box>

                    <Box2>

                        <h1 className="text-3xl font-semibold text-center"> Orders</h1>
                        {
                            !orderLoaded && session && (

                                <Spinner />
                            )
                        }
                        {
                            !session && (

                                <h1 className=" text-md font-semibold text-center "> Login to See Past Orders. </h1>
                            )
                        }
                        {

                            orderLoaded && (

                                <div>{

                                    order.length > 0 && order.map(o => (

                                        <AccOrders key={o._id} {...o} />

                                    ))

                                }</div>

                            )
                        }
                        {

                            orderLoaded && (

                                <div>{

                                    order.length === 0 && (

                                        <h1 className=" text-md font-semibold text-center "> No Past Orders. </h1>

                                    )

                                }</div>

                            )
                        }
                    </Box2>


                </Wrapper>


            </Center>

        </>
    )


}


