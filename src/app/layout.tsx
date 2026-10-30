import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "digital agency",
    "web development",
    "e-commerce",
    "digital marketing",
    "branding",
    "AI solutions",
    "Everforge",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteConfig.description,
    // Intentionally omit `url` so the social card title area stays clean
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/fav-icon.png", type: "image/png", sizes: "any" },
      { url: "/assets/brand/icon-e.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/fav-icon.png"],
    apple: [{ url: "/assets/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F6F9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.siteName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  email: siteConfig.email,
  slogan: siteConfig.tagline,
  url: siteUrl,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F6F9] text-[#10294A]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <noscript>
          <style>{`.ef-preloader { display: none !important; }`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
