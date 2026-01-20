import type { Metadata } from "next";
import { Geist, Google_Sans_Code, Saira} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kabsmeiou.space"),
  title: "Christian Cabral (Kabsmeiou) - Builder Portfolio",
  description: "Christian Cabral (kabsmeiou) - software engineer building scalabl backend systems with Python technologies",
  keywords: ['Christian Cabral', 'kabsmeiou', 'カブス', 'software engineer', 'backend developer', 'Python', 'Django', 'Flask', 'FastAPI', 'machine learning', 'AI', 'projects', 'portfolio'],
  authors: [{ name: "Christian Cabral", url: "https://kabsmeiou.space" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Christian Cabral | kabsmeiou | カブス - Portfolio",
    description: "Christian Cabral (kabsmeiou) - software engineer building scalabl backend systems with Python technologies",
    url: "https://kabsmeiou.space",
    siteName: "Christian Cabral Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christian Cabral (kabsmeiou) Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Cabral (kabsmeiou) | Backend Engineer",
    description:
      "Backend-focused software engineer building scalable systems with Python, FastAPI, and Django.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${googleSansCode.variable}  
          ${saira.variable}
          antialiased`}
      >
      <div className="flex font-saira min-h-screen justify-center dark:bg-black">
        {children}
      </div>
      </body>
    </html>
  );
}
