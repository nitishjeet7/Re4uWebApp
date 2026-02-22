import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "./providers";
import { LOGO_MAIN_SRC } from "@/lib/branding";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXTAUTH_URL || "http://62.72.56.143";

export const metadata: Metadata = {
  title: "Researchedit4u - Academic Editing and Research Support",
  description:
    "Premium academic editing, research support, and publication readiness for scholars.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Researchedit4u",
    description: "Premium academic editing and research support.",
    url: siteUrl,
    type: "website",
  },
  icons: {
    icon: LOGO_MAIN_SRC,
    shortcut: LOGO_MAIN_SRC,
    apple: LOGO_MAIN_SRC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
