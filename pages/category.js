
import Cards from "@/components/cards";
import Center from "@/components/center";
import Footr from "@/components/footr";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/category";
import Link from "next/link";
import styled from "styled-components";


const CatDiv = styled.div`

display:grid;
gap:25px;
grid-template-columns:1fr 1fr ;
margin-top:10px;
@media screen and (min-width:768px){

    grid-template-columns:1fr 1fr 1fr 1fr;

}

`;

const ShowAll= styled.div`

background-color:#ddd;
height:200px;
border-radius:15px;

`;

export default function CategoryPage({maincategories,categoryproducts}){

return(

    <>
    <Header/>
    <Center>
{
    maincategories.map(p=>(

        <div key={p._id}>
    <div className="flex gap-3 items-center mt-6">
    <div className="text-4xl " >
        {p.name}
    </div>
   
    </div>
    <CatDiv>
        {
            categoryproducts[p._id].map((pro,q)=>(

               <Cards key={q} {...pro}/>

            ))
        }
 <Link href={'/category/'+ p._id}>
<ShowAll className=" text-sm flex justify-center items-center">
   Show All&rarr;
   </ShowAll>
   </Link> 
    </CatDiv>
</div>

    )


    )
}

    </Center>
    
    <Footr/>
    </>
)


}



export  async function getServerSideProps(){
 await mongooseConnect();
const category =  await Category.find();
const maincategories=category.filter(c => !c.parent);
const categoryProducts={};

for ( const mainCat of maincategories){
const mainCatId=mainCat._id.toString();
const childCatId= category.filter(c=>c.parent?.toString() === mainCatId).map(c=>c._id.toString());
const categoryIds=[mainCatId,...childCatId];
    const products= await Product.find({category:categoryIds},null,{limit:3,sort:{'_id':-1}});
    categoryProducts[mainCat._id] = products;

}
    return{

        props:{
maincategories:JSON.parse(JSON.stringify(maincategories)),

categoryproducts:JSON.parse(JSON.stringify(categoryProducts)),
        }
        
    }


}