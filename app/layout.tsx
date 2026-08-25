import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000"),
  title: "Swara Flow — Feel every swara",
  description: "A focused digital riyaz room for everyday Carnatic swara practice.",
  openGraph: {
    title: "Swara Flow — Feel every swara",
    description: "A focused digital riyaz room for everyday Carnatic swara practice.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Swara Flow — Feel every swara. Find your flow." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swara Flow — Feel every swara",
    description: "A focused digital riyaz room for everyday Carnatic swara practice.",
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
