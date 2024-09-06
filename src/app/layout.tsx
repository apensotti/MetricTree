import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/ui/theme-provider"
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
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >       
          {children}
          </ThemeProvider>
        </body>
      </html>
    ) 
  }