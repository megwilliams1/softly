import type { Metadata } from "next";
import SeasonalBackground from "@/components/shared/SeasonalBackground";
import InAppBrowserGate from "@/components/shared/InAppBrowserGate";
import ClientLayout from "@/components/shared/ClientLayout";
import { getSeason } from "@/lib/utils/season";
import "./globals.css";

export const metadata: Metadata = {
  title: "Softly",
  description: "A quiet little garden for your family life — plan, nourish, reflect, and grow.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Softly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const season = getSeason();

  return (
    <html lang="en" data-season={season} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('softly:theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#6b4f3a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/icons/icon-maskable.svg" />
      </head>
      <body>
        <InAppBrowserGate>
          <SeasonalBackground />
          <ClientLayout>
            {children}
          </ClientLayout>
        </InAppBrowserGate>
      </body>
    </html>
  );
}
