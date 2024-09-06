import { Inter as FontSans } from "next/font/google"
import Script from 'next/script'
import "@/styles/global.css"

import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata = {
    title: 'Metric Tree',
    description: 'A metric tree visualization',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" >
        <head>
          <Script src="https://cdn.tailwindcss.com"></Script>
        </head>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          {children}
        </body>
      </html>
    ) 
  }