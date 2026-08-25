import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swara Flow — Carnatic practice",
  description: "Open-source Carnatic swara practice for flute learners.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
