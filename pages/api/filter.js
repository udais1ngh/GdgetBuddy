import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req,res){

await mongooseConnect();
const {categories, sortBy , searchText} = req.query;
//const [sortF]= sortBy.split('-');
const productQuery = {}

    if (categories) {
        productQuery.category = categories;
      }
     
    
    let sortField ='price';
    let sortOrder =1;

    if(sortBy === 'price-asc'){
       sortField='price'
        sortOrder=1
    }
    else if(sortBy === 'price-dsc') {
sortField='price'
        sortOrder=-1;
    }
    else if(sortBy === '_id-dsc'){
sortField='_id';
sortOrder=-1;

    }
    else if(sortBy === '_id-asc'){
        sortField='_id';
        sortOrder=1;
        
            }
        

            if(searchText){
productQuery['$or']=[
{title:{$regex:searchText,$options:'i'}},
{description:{$regex:searchText,$options:'i'}},

]
            }
           

      res.json(await Product.find(productQuery,null, {
        sort:{[sortField]:sortOrder }
      }))


}