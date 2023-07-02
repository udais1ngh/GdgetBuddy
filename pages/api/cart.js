
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handle(req,res){
    const {method} = req;
    if (method === 'POST') {
        const ids = req.body.ids;
        try {
          const db = await connectToDatabase();
          const collection = db.collection('products');
         //res.status(200).json(await collection.find({ _id: { $in: id } }).toArray());
         const productPromises = ids.map((id) =>  collection.findOne({ _id: new ObjectId(id) }));
         const products = await Promise.all(productPromises);
        const cProd = JSON.parse(JSON.stringify(products));
        res.status(200).json({cProd}); 
        } catch (error) {
          console.error('Error fetching product:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
    
}