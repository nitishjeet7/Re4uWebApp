import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "./providers";
import GTM, { GTM_CONTAINER_ID } from "@/components/GTM";
import { SITE_APPLE_ICON_SRC, SITE_ICON_16_SRC, SITE_ICON_32_SRC, SITE_ICON_SRC } from "@/lib/branding";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXTAUTH_URL || "http://62.72.56.143";

export const metadata: Metadata = {
  title: "Researchedit4u Solutions",
  description:
    "Premium academic editing, research support, and publication readiness for scholars.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Researchedit4u Solutions",
    description: "Premium academic editing and research support.",
    url: siteUrl,
    type: "website",
  },
  icons: {
    icon: [
      { url: SITE_ICON_16_SRC, type: "image/png", sizes: "16x16" },
      { url: SITE_ICON_32_SRC, type: "image/png", sizes: "32x32" },
      { url: SITE_ICON_SRC, type: "image/png", sizes: "512x512" },
    ],
    shortcut: SITE_ICON_32_SRC,
    apple: [{ url: SITE_APPLE_ICON_SRC, type: "image/png", sizes: "180x180" }],
  },
  verification: {
    google: "6Imp7-Q4GfmrYmetNUjHEUWIy9NgOlcEPQbeLbIUnMA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTM />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
