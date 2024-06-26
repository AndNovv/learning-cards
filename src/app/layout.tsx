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

  title: "Plexicon: Онлайн Флеш-карточки",
  description: 'Онлайн-платформа для эффективного изучения иностранных языков! Вас ждет современная и уникальная система Флеш Карточек, изучайте слова и фразы на английском и других языках.',
  openGraph: {
    description: 'Онлайн-платформа для эффективного изучения иностранных языков! Вас ждет современная и уникальная система Флеш Карточек, изучайте слова и фразы на английском и других языках.',
  },
  keywords: ['Plexicon', 'Плексикон', 'Онлайн учить слова', 'Онлайн флеш карточки', 'Онлайн', 'Изучение английского языка', 'Английский', 'Флешкарты', 'Флеш карточки', 'Флеш-карточки', 'Учить слова', 'Эффективные методы запоминания слов'],
  verification: {
    google: "VEMp4KvADQ9FUviZuVeemP0fRh4I2E97rSdbrw_pIV8",
    yandex: "ffa6217e6fcfc487",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh" suppressHydrationWarning >
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
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
