import { useState } from "react";
import styled from "styled-components";

const Image=styled.img`
max-width:100%;
height:150px;
margin:auto;
`;
const Images=styled.img`
max-width:100%;
max-height:100%;
`;


const ImageBtn=styled.div`
display:flex;
gap:10px;
flex-grow:0;
`;

const ImageButton = styled.div`
border:1px solid #aaa;
height:65px;
width:65px;
margin-top:20px;
display:flex;
justify-content:center;
allign-items:center;
padding:4px;
cursor:pointer;
border-radius:5px;
${props=>props.active ? `border-color:#AEC6CF`:`border-color:transparent;`}
`;

export default function ProductImages({images}){
   
    const [activeImg,setActiveImg]=useState(images?.[0])


return(
<>
<Image src={activeImg} alt=""/>

    <ImageBtn>
{
    images.map(image=>(
<ImageButton key={image} onClick={()=>setActiveImg(image)} active={image === activeImg}>
<Images src={image} alt=""/>
</ImageButton>

    ))
}
    </ImageBtn>
    </>
)

}