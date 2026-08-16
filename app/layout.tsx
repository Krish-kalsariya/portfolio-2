import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FrozenBackground from "@/components/FrozenBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticTargets from "@/components/MagneticTargets";
import SeasonProvider, {
  SEASON_BOOT_SCRIPT,
} from "@/components/SeasonProvider";
import LanguageProvider, {
  LANG_BOOT_SCRIPT,
} from "@/components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kalsariya-krish.vercel.app"
  ),
  title: {
    default: "Krish Kalsariya | Full Stack Developer & Software Engineer",
    template: "%s | Krish Kalsariya",
  },
  description:
    "Official portfolio of Krish Kalsariya — Full Stack Developer & MERN Stack Specialist. Crafting exceptional 3D web experiences with Next.js, React, Node.js, and Three.js.",
  keywords: [
    "Krish Kalsariya",
    "Krish Kalsariya Portfolio",
    "Krish Kalsariya Developer",
    "Krish Kalsariya Full Stack",
    "Krish Kalsariya Software Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "3D Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Krish Kalsariya", url: "https://github.com/Krish-kalsariya" }],
  creator: "Krish Kalsariya",
  publisher: "Krish Kalsariya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://kalsariya-krish.vercel.app",
  },
  verification: {
    google: "google89f58a7e7f9d3b06",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Krish Kalsariya | Full Stack Developer",
    description:
      "Official portfolio of Krish Kalsariya — Full Stack Developer & MERN Specialist. Explore interactive 3D web projects built with Next.js and Three.js.",
    url: "https://kalsariya-krish.vercel.app",
    type: "profile",
    locale: "en_US",
    siteName: "Krish Kalsariya Portfolio",
    emails: ["kalsariyakrish22@gmail.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krish Kalsariya | Full Stack Developer",
    description:
      "Official portfolio of Krish Kalsariya — Full Stack Developer & MERN Specialist. Built with Next.js and React Three Fiber.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kalsariya-krish.vercel.app/#person",
      name: "Krish Kalsariya",
      alternateName: ["Krish", "Krish Kalsariya Developer"],
      jobTitle: "Full Stack Developer",
      url: "https://kalsariya-krish.vercel.app",
      description:
        "Full Stack Developer and MERN stack specialist specializing in modern web applications, Next.js, React, Node.js, and interactive 3D web experiences.",
      email: "kalsariyakrish22@gmail.com",
      sameAs: [
        "https://github.com/Krish-kalsariya",
        "https://www.linkedin.com/in/krish-kalsariya",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Three.js",
        "Full Stack Web Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kalsariya-krish.vercel.app/#website",
      url: "https://kalsariya-krish.vercel.app",
      name: "Krish Kalsariya Portfolio",
      description: "Personal 3D portfolio website of Krish Kalsariya",
      author: {
        "@id": "https://kalsariya-krish.vercel.app/#person",
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#060e1c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Run synchronously before hydration to apply the user's stored
            season + language — avoids a flash of the default values. */}
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SeasonProvider>
            <FrozenBackground />
            <ScrollProgress />
            {children}
            <CustomCursor />
            <MagneticTargets />
          </SeasonProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
