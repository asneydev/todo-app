import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Todo - App",
  description: "Todo app demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
