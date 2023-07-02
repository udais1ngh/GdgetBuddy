import Center from "./center";
import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { CartCont } from "./CardContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiArrowBack } from "react-icons/bi";
const Bg = styled.div`
background-color:#222;
color:#fff;
padding:50px 0;
`;

const Desc = styled.p`
color:#aaa;
padding-bottom:10px;
`;

const Wrap = styled.div`
margin:auto;
max-width:500px;
img{
    max-height:200px;
    max-width:200px;
    margin:-50px auto 0 auto;
}
div:nth-child(1){
order:2;
}
@media screen and (min-width:768px){
    grid-template-columns:1fr;

    img{
        max-height:300px;
        max-width:300px;
        margin:auto;
    }
    div:nth-child(1){
        order:0;
        
        }
    
    }

`;
const Column = styled.div`
display:flex
align-items:center;
padding-top:50px;
flex-direction:column;
@media screen and (min-width:768px){

padding-top:0;

}
`;




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



export default function Features({ product}) {
    const { setCartProducts } = useContext(CartCont);

    function addFeaturedToCart(id) {
        notify()
        setCartProducts(prev => [...prev, id]);
    }


    return (

        <Bg >
            <Center>
                <Wrap >
                    <Carousel
                        autoPlay={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        showIndicators={false}
                        showStatus={false}
                        renderArrowPrev={(clickHandler, hasPrev) => (
                            <div
                                onClick={clickHandler}
                                className="absolute right-[40px]  md:right-[60px] bottom-[350px] w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
                            >
                                <BiArrowBack className="text-sm md:text-lg" />
                            </div>
                        )}
                        renderArrowNext={(clickHandler, hasNext) => (
                            <div
                                onClick={clickHandler}
                                className="absolute right-0 bottom-[350px] w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
                            >
                                <BiArrowBack className="rotate-180 text-sm md:text-lg" />
                            </div>
                        )}
                    >






                        <Column>


                            <img src={product.products.images[0]} alt="" />
                            <Column>
                                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                                    {product.products.title}
                                </h1>
                                <Desc>
                                    {product.products.description}
                                </Desc>
                                <div className="flex gap-2 justify-center items-center">
                                    <Link href={'/product/' + product.products._id}><button type="button" className="text-white bg-blue-700  hover:bg-blue-800  outline-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Read More</button></Link>
                                    <button className="text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>addFeaturedToCart(product.products._id)} >Add to Cart</button>
                                </div>

                            </Column>
                        

                        </Column>

                        <Column>
                            <img src={product.products2.images[0]} alt="" />
                            <Column>
                                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                                    {product.products2.title}
                                </h1>
                                <Desc>
                                    {product.products2.description}
                                </Desc>
                                <div className="flex gap-2 justify-center items-center">
                                    <Link href={'/product/' + product.products2._id}><button type="button" className="text-white bg-blue-700  hover:bg-blue-800  outline-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Read More</button></Link>
                                    <button className="text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>addFeaturedToCart(product.products2._id)} >Add to Cart</button>
                                </div>

                            </Column>


                        </Column>

                        <Column>
                            <img src={product.products3.images[0]} alt="" />
                            <Column>
                                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                                    {product.products3.title}
                                </h1>
                                <Desc>
                                    {product.products3.description}
                                </Desc>
                                <div className="flex gap-2 justify-center items-center">
                                    <Link href={'/product/' + product.products3._id}><button type="button" className="text-white bg-blue-700  hover:bg-blue-800  outline-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Read More</button></Link>
                                    <button className="text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>addFeaturedToCart(product.products3._id)} >Add to Cart</button>
                                </div>

                            </Column>


                        </Column>

                    </Carousel>
                </Wrap>
            </Center>

        </Bg>

    )


}







{/* <div className="relative text-white text-[20px] w-full max-w-[300px] mx-auto">
    <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
            <div
                onClick={clickHandler}
                className="absolute right-[45px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
            >
                <BiArrowBack className="text-sm md:text-lg" />
            </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
            <div
                onClick={clickHandler}
                className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
            >
                <BiArrowBack className="rotate-180 text-sm md:text-lg" />
            </div>
        )}
    >
        <div>

            <img src="https://nextjs-ecommercestore.s3.amazonaws.com/1685261335279.png" alt="" className="aspect-[16/10] md:aspect-auto object-cover" />

            <div className="px-[15px] md:px-[20px] py-[10px] md:py-[15px] font-oswald bg-white absolute bottom-[15px] md:bottom-[45px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                Shop now
            </div>


        </div>

        <div>
            <img src="https://nextjs-ecommercestore.s3.amazonaws.com/1685261335279.png" alt="" className="aspect-[16/10] md:aspect-auto object-cover" />
            <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                Shop now
            </div>
        </div>

        <div>
            <img src="https://nextjs-ecommercestore.s3.amazonaws.com/1685261335279.png" alt="" className="aspect-[16/10] md:aspect-auto object-cover" />
            <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                Shop now
            </div>
        </div>
    </Carousel>
</div> */}





{/* <div className="px-[10px] md:px-[20px] py-[10px] md:py-[15px] font-oswald bg-white absolute bottom-[75px] md:bottom-0 left-[60px] md:left-[300px] text-black/[0.9] text-[10px] md:text-[15px] uppercase font-medium cursor-pointer hover:opacity-90">
Shop now
</div> */}




{/* <Wrap>
<Column>
    <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        {product.title}
    </h1>
    <Desc>
        {product.description}
    </Desc>
    <div className="flex gap-2">
        <Link href={'/product/' + product._id}><button type="button" className="text-white bg-blue-700  hover:bg-blue-800  outline-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Read More</button></Link>
        <button className="text-white  bg-green-700   hover:bg-green-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={addFeaturedToCart} >Add to Cart</button>
    </div>

</Column>
<Column>
    <img src="https://nextjs-ecommercestore.s3.amazonaws.com/1685261335279.png" alt="" />
</Column>
</Wrap> */}





