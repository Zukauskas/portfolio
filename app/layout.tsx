import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} font-orbitron`}>{children}</body>
    </html>
  );
}
