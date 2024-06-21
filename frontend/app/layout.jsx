import { Quicksand } from "next/font/google";
import "./globals.css";
//import {PrivyProvider} from '@privy-io/react-auth';
//import {CreatePage} from "./create/page.jsx"

import Header from "@/components/Header";
import ScrollTop from "@/components/ScrollTop";

const quickSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

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

      //<PrivyProvider appId="APP_ID_FROM_DASHBOARD" onSuccess={() => console.log('Success!')}>
          <Component {...pageProps} />
          <Submit />
          <SignIn />
        </PrivyProvider> 
      </body>
    </html>
  );
}
