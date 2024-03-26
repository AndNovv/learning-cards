import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavigationMenu from "@/components/Navigation/NavigationMenu";
import AsideMenu from "@/components/Aside/AsideMenu";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NextAuthProvider } from "@/providers/NextAuthProvider"
import StoreProvider from "@/providers/StoreProvider";
import UserProvider from "@/providers/UserProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex flex-row')}>
        <StoreProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UserProvider>
                <AsideMenu />
                <main className="flex flex-col w-full h-screen">

                  <NavigationMenu />
                  <div className="relative flex-1 px-10 py-2 overflow-hidden">
                    {children}
                  </div>
                </main>
                <Toaster />
              </UserProvider>

            </ThemeProvider>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html >
  );
}
