import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { ThemeProvider } from '@mui/material/styles';
// import theme from "@/styles/theme";
// import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from "@/contexts/authProvider";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "@/contexts/cartProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Globimart",
  description: "Hàng hoá toàn cầu, tiện ích địa phương",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>

       <CartProvider>

        {children}
       </CartProvider>
        </AuthProvider>
      
      </body>
    </html>
  );
}
