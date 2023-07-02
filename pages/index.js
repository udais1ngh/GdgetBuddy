import Features from "@/components/featured";
import Footer from "@/components/footer";
import Footr from "@/components/footr";
import Header from "@/components/header";
import NewProducts from "@/components/newproducts";
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from 'mongodb';
import styled from "styled-components";
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";

const     Wrapper = styled.div`

min-height:100vh;


`;


export default function Home({featured,newProducts}){
  return(

    <Wrapper>
<Header/>
<Features product={featured}/>
<NewProducts products={newProducts}/>
<Footr/>
    </Wrapper>
  )
}


export async function getServerSideProps(context) {
  const db = await connectToDatabase();
  const settingCollection = db.collection('settings')
  const featuredId = await settingCollection.findOne({namea:'featuredProductId'})
  const collection = db.collection('products');
  const newProducts =  await collection.find({}).sort({ _id: -1 })
  .limit(12).toArray();
  const products = await collection.findOne({ _id: new ObjectId(featuredId.valuea) });
  const products2 = await collection.findOne({ _id: new ObjectId(featuredId.valueb) });
  const products3 = await collection.findOne({ _id: new ObjectId(featuredId.valuec) });
  const allFeatured ={
    products,products2,products3
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      products2: JSON.parse(JSON.stringify(products2)),
      products3: JSON.parse(JSON.stringify(products3)),
      newProducts:JSON.parse(JSON.stringify(newProducts)),
      featured: JSON.parse(JSON.stringify(allFeatured)),
    },
  };
}

