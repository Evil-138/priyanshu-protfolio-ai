import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priyanshu Shukla — AI Developer & Data Science Engineer",
  description:
    "AI Developer focused on Data Science, Machine Learning, Generative AI, Quantitative Research & High-Performance Web Systems. Building intelligent systems with code & data.",
  keywords: [
    "AI Developer",
    "Data Science",
    "Machine Learning",
    "Generative AI",
    "Quantitative Trading",
    "Web Development",
    "Priyanshu Shukla",
  ],
  authors: [{ name: "Priyanshu Shukla" }],
  openGraph: {
    title: "Priyanshu Shukla — AI Developer",
    description:
      "Building intelligent systems with code & data. AI, ML, Generative AI, Quant Research.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
