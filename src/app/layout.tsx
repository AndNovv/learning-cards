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

  title: "Plexicon: Флешкарты - ключ к языкам",
  description: 'Добро пожаловать в Plexicon – вашу онлайн-платформу для эффективного изучения иностранных языков! Усовершенствуйте свой словарный запас с помощью нашей уникальной системы флешкарточек, изучайте слова и фразы на английском и других языках, применяйте эффективные методы запоминания слов.',
  openGraph: {
    description: 'Добро пожаловать в Plexicon – вашу онлайн-платформу для эффективного изучения иностранных языков! Усовершенствуйте свой словарный запас с помощью нашей уникальной системы флешкарточек, изучайте слова и фразы на английском и других языках, применяйте эффективные методы запоминания слов.',
  },
  keywords: ['Plexicon', 'Плексикон', 'Онлайн-система обучения с флешкарточками', 'Эффективные методы запоминания слов', 'Изучение английского языка', 'Флешкарты', 'Учебные ресурсы для изучения лексики'],
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
