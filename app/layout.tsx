import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { inter, satoshi } from "@/lib/fonts";
import Footer from "@/components/sections/footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import { NavigationProvider } from "@/contexts/navigation-context";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${satoshi.variable} ${inter.variable} w-[100svw] overflow-x-clip antialiased bg-surface-base scheme-only-dark`}
      >
        <NavigationProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}
