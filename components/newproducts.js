import styled from "styled-components";
import Center from "./center";
import Cards from "./cards";
const ProductGrid=styled.div`
display:grid;
gap:25px;
grid-template-columns:1fr 1fr ;
@media screen and (min-width:768px){

    grid-template-columns:1fr 1fr 1fr 1fr;

}
`;

export default function NewProducts({products}){

return(
<Center>
<h2 className="text-4xl font-medium mt-2 mb-2">New Arrivals</h2>
<ProductGrid>
{
products?.length > 0 && products.map(p=>(

<Cards key={p._id} {...p}/>

))

}
</ProductGrid>

</Center>
)

}