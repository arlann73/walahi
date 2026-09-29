import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";

const geistPixelGrid = localFont({
  src: "../fonts/GeistPixel-Grid.woff2",
  weight: "500",
  display: "swap",
  variable: "--font-geist-pixel-grid",
  preload: false,
});

export const metadata: Metadata = {
  title: "ARLAN | Digital Designer & Creative Developer",
  description: "High-end personal portfolio of ARLAN, Creative Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${geistPixelGrid.variable} h-full antialiased no-scrollbar font-sans`}
    >
      <head>
        <link rel="preload" href="/model.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-highlight no-scrollbar font-sans"
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <FilmGrain />
      </body>
    </html>
  );
}
