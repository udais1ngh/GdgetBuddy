import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from '@/lib/mongo';



export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
     
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(
     clientPromise
  ),

  
};

export default NextAuth(authOptions);

