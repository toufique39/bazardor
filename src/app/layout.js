import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        {children}

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