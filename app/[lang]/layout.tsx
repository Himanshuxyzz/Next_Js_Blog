import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// components
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/navigation/Footer'
import { getDictionary } from '@/lib/getDictionary'
import siteConfig from '@/config/siteConfig'


// export const metadata: Metadata = {
//   title: 'Explorer',
//   description: `${siteConfig.description}`,
// }

// dynamic metadata

export const generateMetadata = async ({ params: {
  lang
} }: {
  params: {
    lang: string;
  }
}) => {
  // get the dictionary
  const dictionary = await getDictionary(lang)

  return {
    title: {
      template: "%s | " + siteConfig.siteName,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "https://localhost:3000/opengraph-image.png",
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website", 
    },
  }
}


export default function RootLayout({
  children,
  params: {
    lang
  }
}: {
  children: React.ReactNode,
  params: {
    lang: string
  }
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className='pt-10 min-h-[100vh]'>
          {children}
        </div>
        <Footer locale={lang} />
      </body>
    </html>
  )
}
