import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Anvin Infosystems — Operating System for GCC Enterprises",
  description: "Anvin Infosystems builds the AdlER suite — ERP, HCM, mobility, facility management, and IoT products serving 500+ clients across the GCC region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,700&family=Outfit:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary selection:bg-cyan selection:text-bg-base font-body">
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
