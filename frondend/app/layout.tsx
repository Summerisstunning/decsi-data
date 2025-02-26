import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ProjectProvider } from "@/contexts/project-context"
import { Toaster } from "@/components/toaster"
import { InvestmentProvider } from "@/contexts/investment-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DeSciData | Decentralized Scientific Research Platform",
  description: "A platform combining scientific research data, decentralized storage, and crowdfunding for researchers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProjectProvider>
            <InvestmentProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </InvestmentProvider>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'