import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "@/../../public/assets/images/bkd-lamtim.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SISTEM PANDUAN BKD KABUPATEN LAMPUNG TIMUR",
  description: "Sistem Panduan BKD Kabupaten Lampung Timur",
  icons: {
    icon: {
      url: `${logo.src}`,
    },
  },
  openGraph: {
    title: "SISTEM PANDUAN BKD KABUPATEN LAMPUNG TIMUR",
    description: "Sistem Panduan BKD Kabupaten Lampung Timur",
    url: "https://admin-bkd.newus.id/",
    siteName: "Sistem Panduan BKD Kabupaten Lampung Timur",
    images: [
      {
        url: `${logo.src}`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "id-ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
