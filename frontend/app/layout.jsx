import { Quicksand } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import ScrollTop from "@/components/ScrollTop";

const quickSand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Findout Trivia",
  description:
    "Findout is a trivia app that allows you to create quizzes and share them with friends to win prizes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <Header />
        {children}
        <ScrollTop />
      </body>
    </html>
  );
}
