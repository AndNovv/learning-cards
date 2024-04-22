import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers/Providers";
import NavigationMenu from "@/components/Navigation/NavigationMenu";
import AsideMenu from "@/components/Aside/AsideMenu";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/logo.svg", // /public path
        href: "/images/logo.svg", // /public path
      },
    ],
  },
  title: "Plexicon",
  description: "Изучение иностранных языков",
  verification: {
    google: "VEMp4KvADQ9FUviZuVeemP0fRh4I2E97rSdbrw_pIV8",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh" suppressHydrationWarning >
      <body className={cn(inter.className, 'flex flex-row h-full overflow-hidden')}>
        <Providers>
          <>
            <AsideMenu />
            <main className="relative flex flex-col flex-1 overflow-hidden">
              <NavigationMenu />
              {children}
            </main>
            <Toaster />
          </>
        </Providers>

      </body>
    </html >
  );
}
