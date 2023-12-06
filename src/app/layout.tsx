import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIdeation Like Notion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </Provider>
    </html>
    </ClerkProvider>
  )
}
