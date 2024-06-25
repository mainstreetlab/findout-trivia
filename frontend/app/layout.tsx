import { Quicksand } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import ScrollTop from "@/components/ScrollTop";
import LoaderOverlay from "@/components/LoaderOverlay";

import Providers from "./providers";

import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster"

const quickSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Findout Trivia",
  description:
    "Findout is a trivia app that allows you to create quizzes and share them with friends to win prizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <Providers>
          <LoaderOverlay>
            <Header />
            {children}
            <ScrollTop />
          </LoaderOverlay>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
