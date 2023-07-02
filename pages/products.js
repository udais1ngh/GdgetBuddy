
import ProductGrid from "@/components/ProductGrid";
import Center from "@/components/center";
import Footr from "@/components/footr";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default function Products({products}){

return(
<>
<Header/>
<Center>


<h1 className="text-4xl font-medium mt-2 mb-2 ">All Products</h1>
<ProductGrid products={products}/>






</Center>
<Footr/>
</>


)

}


export async function getServerSideProps(){
await mongooseConnect()
const AllProducts = await Product.find({});

return{
props:{
products:JSON.parse(JSON.stringify(AllProducts)),
}

}

}