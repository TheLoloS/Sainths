import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation";
import Alert from "@/components/ui/Alert";
import { GameStoreInitializer } from "@/lib/GameStoreInitializer";

const christmasFont = localFont({
  src: [
    {
      path: "./fonts/MountainsofChristmas-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/MountainsofChristmas-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-christmas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sainths - Świąteczna Gra",
  description: "Zagraj w świąteczne gry z rodziną i przyjaciółmi!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={christmasFont.variable}>
      <body className="antialiased">
        <GameStoreInitializer />
        <BackgroundAnimation />
        {children}
        <Alert />
      </body>
    </html>
  );
}
