import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({ variable: "--font-work-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Irugle — Discover. Stay. Explore.",
  description: "The hospitality platform for Rwanda and beyond. Hotels, tours, guides, and experiences — all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
