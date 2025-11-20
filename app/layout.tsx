import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/config/fonts";

import { Navbar } from "@/components/navbar";
import QueryProvider from "@/providers/queryProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
      lang="en"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased"
        )}
      >
        <QueryProvider>
          <Suspense fallback={<div aria-hidden /> }>
            <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </Providers>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
