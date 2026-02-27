import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import SeasonalBackground from "@/components/shared/SeasonalBackground";
import { getSeason } from "@/lib/utils/season";
import "./globals.css";

export const metadata: Metadata = {
  title: "Softly",
  description: "A mom's weekly sanctuary app",
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
      </head>
      <body>
        <SeasonalBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
