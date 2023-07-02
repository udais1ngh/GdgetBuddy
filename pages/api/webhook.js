import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

const endpointSecret = "whsec_a17f7c5d42b7b704fc13ebd24f558999fbd7dd9c4667cce2c983de2872f68342";




export  default async function handler(req,res){
await mongooseConnect();
const sig = req.headers['stripe-signature'];

let event;

try {
  event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
} catch (err) {
  res.status(400).send(`Webhook Error: ${err.message}`);
  return;
}

// Handle the event
switch (event.type) {
  case 'checkout.session.completed':
    const data = event.data.object;
    console.log(data);
    const orderId=data.metadata.orderId;
    const paid=data.payment_status === 'paid';

if(orderId && paid){
 await Order.findByIdAndUpdate(orderId,{
  paid:true,
})

}

    break;
  // ... handle other event types
  default:
    console.log(`Unhandled event type ${event.type}`);
}

res.status(200).send('ok');
}

export const config={
    api:{bodyParser:false,}
}

//safely-loyal-chaste-proper
// acct_1NEpaMSGlMCVNPVy

//loves-peace-well-led
//acct_1NEpaMSGlMCVNPVy
