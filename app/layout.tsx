import type { Metadata } from "next";
import { HAS_PUBLIC_SITE_URL, SITE_URL } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: "Carnatic Music Practice Online | Swara Flow",
  description: "Practice 14 verified Sarali Varisai lessons in Mayamalavagowla with guided swara playback, adjustable Sa and tempo, and flute or tone.",
  applicationName: "Swara Flow",
  category: "education",
  creator: "Swara Flow",
  publisher: "Swara Flow",
  alternates: { canonical: "/" },
  robots: {
    index: HAS_PUBLIC_SITE_URL,
    follow: HAS_PUBLIC_SITE_URL,
    googleBot: {
      index: HAS_PUBLIC_SITE_URL,
      follow: HAS_PUBLIC_SITE_URL,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Swara Flow",
    url: "/",
    title: "Carnatic Music Practice Online | Swara Flow",
    description: "Practice 14 verified Sarali Varisai lessons with guided swara playback, adjustable Sa and tempo.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Swara Flow — Feel every swara. Find your flow." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carnatic Music Practice Online | Swara Flow",
    description: "Practice 14 verified Sarali Varisai lessons with guided swara playback, adjustable Sa and tempo.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
