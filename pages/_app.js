import { CartContextProvider } from '@/components/CardContext'
import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react";
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps: {session, ...pageProps }}) {
  
  return (
  
  <>
  <SessionProvider session={session}>
  <CartContextProvider>
    <Component {...pageProps} />
    <ToastContainer/>
    </CartContextProvider>

  </SessionProvider>
   

  </>
 
  )
}
