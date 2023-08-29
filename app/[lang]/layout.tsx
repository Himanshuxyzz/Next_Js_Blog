import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// components
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/navigation/Footer'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <div className='pt-10 min-h-[100vh]'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}