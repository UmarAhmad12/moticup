"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";
// Import metadata here

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Moticup",
  description: "Brewing Memories",
};

export default function RootLayout({ children }) {
  const router = useRouter();
  // const { pathname } = router;

  // Exclude Navbar on landing and login pages
  // const showNavbar = pathname === "/" || pathname === "/login";

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* {<Navbar />} */}
        {children}
      </body>
    </html>
  );
}
