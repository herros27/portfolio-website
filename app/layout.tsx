import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kemz.my.id"),
  title: {
    default: "Kemas Khairunsyah | Personal Portfolio",
    template: "%s | Kemas Khairunsyah",
  },
  description: "Kemas is a freelancer developer with 2 years of experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kemas Khairunsyah | Personal Portfolio",
    description: "Kemas is a freelancer developer with 2 years of experience.",
    url: "https://kemz.my.id",
    siteName: "Kemas Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <link rel='preconnect' href='https://res.cloudinary.com' />
        <link rel='preconnect' href='https://images.unsplash.com' />
        <link rel='preconnect' href='https://cdn.simpleicons.org' />
      </head>
      <body >
        {children}
      </body>
    </html>
  );
}
