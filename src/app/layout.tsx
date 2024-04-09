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
        url: "/images/muskot-logo.svg", // /public path
        href: "/images/muskot-logo.svg", // /public path
      },
    ],
  },
  title: "Plexicon",
  description: "Изучение иностранных языков",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex flex-row')}>
        <Providers>
          <>
            <AsideMenu />
            <main className="flex flex-col w-full h-screen xl:px-60 lg:px-32 md:px-10 px-5">
              <NavigationMenu />
              <div className="relative flex-1 overflow-hidden pb-10 p-1">
                {children}
              </div>
            </main>
            <Toaster />
          </>
        </Providers>

      </body>
    </html >
  );
}
