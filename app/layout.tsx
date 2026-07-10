import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Textly – AI Text Refiner & Grammar Corrector",
    template: "%s | Textly",
  },

  description:
    "Textly is a free AI writing assistant to rewrite text, improve grammar, refine emails, blog posts, essays, and social media captions in seconds.",

  applicationName: "Textly",

  keywords: [
    "AI text refiner",
    "grammar checker",
    "AI writing assistant",
    "text rewriter",
    "rewrite text",
    "improve writing",
    "email rewriter",
    "essay checker",
    "blog writing",
    "caption generator",
  ],

  authors: [{ name: "Aman Verma" }],
  creator: "Aman Verma",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Textly – AI Text Refiner & Grammar Corrector",
    description:
      "Textly is a free AI writing assistant to rewrite text, improve grammar, refine emails, blog posts, essays, and social media captions in seconds.",
    url: baseUrl,
    type: "website",
    siteName: "Textly",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Textly – AI Text Refiner & Grammar Corrector",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Textly – AI Text Refiner",
    description: "Improve grammar and rewrite text instantly using AI.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        spaceGrotesk.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
