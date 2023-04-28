import '@/styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient()
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
      {/* <App /> */}
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
