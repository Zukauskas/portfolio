import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] });
import Script from 'next/script'

export const metadata = {
  title: "Personal website | Zukauskas.dev",
  description: "Tautvydas Žukauskas personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
      <Script
        defer
        src="http://umami-a4oc4ko.37.27.9.143.sslip.io/script.js"

        data-website-id="d7a0f602-e791-4500-a084-79de1170e5a1"
      />
    </html>
  );
}
