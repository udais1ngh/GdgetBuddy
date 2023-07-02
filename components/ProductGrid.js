
import styled from "styled-components";
import Cards from "./cards";

const StyledProductGrid=styled.div`
display:grid;
gap:25px;
grid-template-columns:1fr 1fr ;
@media screen and (min-width:768px){

    grid-template-columns:1fr 1fr 1fr 1fr;

}

`;


export default function ProductGrid({products}){
    
return(

<StyledProductGrid>
{
products?.length > 0 && products.map(p=>(

    

<Cards key={p._id} {...p}/>
    





))

}
</StyledProductGrid>
)

}