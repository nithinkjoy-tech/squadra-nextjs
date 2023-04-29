import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
      <Component {...pageProps} />
    </>
  )
}
