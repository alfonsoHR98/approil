import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aproil",
  description: "Manufactura de aceites industriales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
