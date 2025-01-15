import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altirev - Election Monitoring Solution",
  description: "Altirev - Election Monitoring Solution App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href=" https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        />
        
      </head>
      <body className="bg-[#f2f6fd]">
        <Provider>
          {children}</Provider>
      </body>
    </html>
  );
}
