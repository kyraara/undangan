export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { getConfig } from "@/lib/get-config"
import { ConfigProvider } from "@/lib/config-context"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig()
  const title = `${config.groom.nameShort} & ${config.bride.nameShort} — ${config.events[0].dateDisplay}`
  const fullTitle = `Undangan Pernikahan ${config.groom.nameDisplay} & ${config.bride.nameDisplay}`
  const heroImage = config.hero.image || "/images/gallery/hero.jpg"
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title,
    description: `Dengan penuh kebahagiaan kami mengundang kehadiran Anda di pernikahan ${config.groom.nameDisplay} & ${config.bride.nameDisplay} pada ${config.events[0].dateDisplay}.`,
    openGraph: {
      title: fullTitle,
      description: `${config.events[0].dateDisplay} · Bersama kami merayakan hari istimewa ini.`,
      images: [heroImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      images: [heroImage],
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#F5ECD7",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const config = await getConfig()
  const themeClass = `theme-${config.concept}`
  return (
    <html
      lang="id"
      className={`${themeClass} ${cormorant.variable} ${playfair.variable} ${lora.variable} bg-background`}
    >
      <body className="font-body antialiased">
        <ConfigProvider config={config}>
          {children}
          <Toaster position="top-center" />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ConfigProvider>
      </body>
    </html>
  )
}
