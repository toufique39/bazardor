import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Navbar></Navbar>
        {children}
          <Footer></Footer>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
          }}
        />
      </body>
    </html>
  );
}