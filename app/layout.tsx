import './globals.css'

export const metadata = {
  title: 'Personal website | Zukauskas.dev',
  description: 'Tautvydas Žukauskas personal website'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
