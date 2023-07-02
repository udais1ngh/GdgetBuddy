import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartCont } from "./CardContext";
import Bars from "./bars";
import Center from "./center";

const StHeader = styled.header`
background-color:#222;


position:sticky;
top:0;
transition:transform 0.3s ease-in-out;
z-index:20;


`;
const Wrap = styled.div`
display:flex;
justify-content:space-between;
padding:2px 0;
align-items:center;
@media screen and (min-width:768px){
    padding:10px 0;
    
    }

`;
const Logo = styled(Link)`
color:#fff;
text-decoration:none
position:relative;
z-index:3;
`;

const Navlink = styled(Link)`
color:#aaa;
text-decoration:none;
display:block;
padding:10px 0;
@media screen and (min-width:768px){
    padding:0;
    
    }
`;

const NavFlex = styled.span`
display:flex;
`;
const NavButton = styled.button`
height:50px;
width:50px;
background-color:transparent;
border:0;
color:white;
cursor:pointer;
position:relative;
z-index:3;
@media screen and (min-width:768px){
display:none;

}
`;
const StyledNav = styled.nav`
${props => props.active ? `display:block;` : `display:none;`}
dispalay:block;
gap:25px;
position:fixed;
top:0;
bottom:0;
left:0;
right:0;
padding:70px 20px 20px;
background-color:#222;

@media screen and (min-width:768px){
    display:flex;
position: static;
padding: 0;
}


`;


export default function Header() {

    const { cartProducts } = useContext(CartCont);
    const [navactive, setNavactive] = useState(false);
    // const [show, setShow] = useState("translate-y-0");
    // const [lastScrollY, setLastScrollY] = useState(0)
    




//     function moveNavber() {
//         if (window.scrollY > 120) {

//             if (window.scrollY > lastScrollY) {

//                 setShow("-translate-y-[80px]")

//             } else {
//                 setShow("shadow-sm")
//             }

//         }
//         else {
//             setShow("translate-y-0")

//         }

//         setLastScrollY(window.scrollY)
//     }

    

//     useEffect(() => {
      
//         let width = window.innerWidth;

// if(width >= 768){

//     window.addEventListener('scroll', moveNavber);

// }
// else{
//     setShow("");
// }

        

//         return () => {
//             window.removeEventListener('scroll', moveNavber);

//         }
//     }, [lastScrollY]);

    return (
        <StHeader>
            <Center>
                <Wrap>
                    <Logo href={'/'}>GadgetBuddy</Logo>
                    <StyledNav active={navactive}>
                        <Navlink href={'/'}>Home</Navlink>
                        <Navlink href={'/products'}>Products</Navlink>
                        <Navlink href={'/category'}>Categories</Navlink>
                        <Navlink href={'/account'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </Navlink>
                        <Navlink href={'/cart'}><NavFlex><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                            <div className="text-red-600 font-semibold">
                                {cartProducts.length}
                            </div>
                        </NavFlex>

                        </Navlink>
                    </StyledNav>
                    <div className="flex gap-4 justify-center items-center">
                        <Navlink href={'/search'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        </Navlink>
                        <NavButton onClick={() => setNavactive(prev => !prev)}>
                            <Bars />
                        </NavButton>

                    </div>

                </Wrap>
            </Center>

        </StHeader>

    );


}