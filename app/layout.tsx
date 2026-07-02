import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bulkhinaa.github.io/marafet-landing-partnerka"),
  title: {
    default: "Партнёрская программа Марафет · зарабатывайте без ИП и налоговой",
    template: "%s · Партнёрка Марафет",
  },
  description:
    "Приглашайте друзей в Марафет и получайте 1% с каждого их визита плюс 1% с визитов их друзей. НДФЛ и страховые взносы (ОПС+ОМС) платит Марафет. Вам приходят чистые деньги на карту, а пенсионный стаж копится автоматически.",
  keywords: [
    "партнёрская программа марафет",
    "реферальная программа",
    "пассивный доход",
    "налоговый агент",
    "без ИП",
    "пенсионный стаж",
    "ОПС",
    "ОМС",
    "заработок на приглашениях",
  ],
  openGraph: {
    title: "Партнёрская программа Марафет",
    description:
      "Зарабатывайте на красоте. Без ИП, без бумажек, без налоговой. Мы платим НДФЛ и страховые взносы за вас.",
    url: "https://marafet.app",
    siteName: "Марафет",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Партнёрская программа Марафет",
    description: "1% с визитов друзей + 1% с друзей друзей. Налоги на нас.",
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1639" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-surface text-ink-100 antialiased">
        {children}
      </body>
    </html>
  );
}
