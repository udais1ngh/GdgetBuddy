import ProductGrid from "@/components/ProductGrid";
import Center from "@/components/center";
import Header from "@/components/header";
import Spinner from "@/components/spinner";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/category";
import axios from "axios";
import { useEffect, useState } from "react";


export default function SingleCategoryPage({category,subCategories,products:originalProducts}){
    
    const [products,setProducts] = useState(originalProducts);
    const [sortBy, setSortBy] = useState('');
   const [loading, setLoading] = useState(false);
 

  useEffect(() => {
setLoading(true)
    fetchProducts();
    setTimeout(()=>{

        setLoading(false);

    },1500);
    
  }, [sortBy]);

  const fetchProducts = async () => {
    try {  
        const catIds = [category._id, ...(subCategories?.map(p=>p._id) || [])];
        const catId=[category._id]

console.log(catIds);
const params = new URLSearchParams;
// params.set('categories',catIds.join(','));
params.set('categories',catId);
params.set('sortBy',sortBy);
       await axios.get(`/api/filter?`+ params.toString()).then(
response=>{
    setProducts(response.data);
}
       )
       

      
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };






return(

<>
<Header/>
<Center>

<h1 className="text-4xl m-2" key={category.name}>{category.name}</h1>
<div className="flex gap-5 my-2 ">
{/* {
    category.properties.map(w=>(
        <div className=" bg-gray-300 p-1 rounded-md" key={w.name} >
            {w.name}:
            <select className="bg-transparent"
            onChange={ev=>handleFilter(w.name,ev.target.value)}
            value={filtersValue.find(f => f.name === w.name).value}>
                <option value="">All</option>
            {w.values.map(q=>(
                <option key={q}> {q}</option>
            ))}
            </select>
        </div>
    ))
} */}
<select className="bg-gray-300 rounded-sm padding-2" value={sortBy} onChange={handleSortChange}>
        
        <option value="price-asc">Price Low to High</option>
        <option value="price-dsc">Price High to Low</option>
        <option value="_id-dsc">Newest First</option>
        <option value="_id-asc">Oldest First</option>
      </select>

</div>
{
    loading && (
        <Spinner/>
    )
}
{
    !loading && (
<ProductGrid products={products}/>
    )
}

</Center>

</>
)
}


export async function getServerSideProps(context){
await  mongooseConnect();

const category = await Category.findById(context.query.id);
const subCategories = await Category.find({parent:category._id});
const catIds = [category._id, ...subCategories.map(p=>(p._id))];

const products = await Product.find({category:catIds})
return{
props:{
category:JSON.parse(JSON.stringify(category)),
products:JSON.parse(JSON.stringify(products)),
subCategories:JSON.parse(JSON.stringify(subCategories)),
}

}

}