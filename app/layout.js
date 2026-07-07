import './globals.css'

export const metadata = {
  title: 'CallSheet — Know who to call.',
  description: 'The simple CRM for agents who just need to know who to call today.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
