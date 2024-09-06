import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "@components/Navbar"

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NavBar />
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </NextUIProvider>
    </SessionProvider>
  );
}
