import { connectToDatabase } from "@/lib/db";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res){

if(req.method !== 'POST'){
res.json('should be a post request')
return
}

const{name,email,
    city,postalcode,
    streetAdd,country,cartProducts,}=req.body;

const productIds=cartProducts;

const uniqueIds=[...new Set(productIds)];

const db = await connectToDatabase();
const collection = db.collection('products');
const productPromises = uniqueIds.map((id) =>  collection.findOne({ _id: new ObjectId(id) }));
const prod = await Promise.all(productPromises);
const stripeProd = JSON.parse(JSON.stringify(prod));


let line_items=[];
for(const productId of uniqueIds){

    const productinfo=stripeProd.find(p=>p._id.toString() === productId);
    const quantity=productIds.filter(id=>id === productId)?.length || 0;

    if(quantity > 0 && productinfo){


        line_items.push({
quantity,
price_data:{
currency:'INR',
product_data:{name:productinfo.title},
unit_amount:productinfo.price*100,
},
        });

    }


}
  
const userSession = await getServerSession(req,res,authOptions);


 await mongooseConnect();
const orderdoc = await Order.create({
line_items,name,email,city,postalcode,streetAdd,country,paid:false,userEmail:userSession?.user?.email,

 })


 const session = await stripe.checkout.sessions.create({
line_items,
mode:'payment',
customer_email:email,
success_url:process.env.PUBLIC_URL + '/cart?success=1',
cancel_url:process.env.PUBLIC_URL + '/cart?success=1',
metadata:{orderId:orderdoc._id.toString()},
shipping_options:[

    {

        shipping_rate_data:{
            display_name:'shipping fee',
            type:'fixed_amount',
            fixed_amount:{amount:10000 , currency:'INR'}
        }
    }
]
 })


res.json({
    url:session.url,
})

}
