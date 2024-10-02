import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from './header'
import Footer from './footer'
import { headers } from 'next/headers'
import { User } from './types/user'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'SportsStats',
    description: 'Quick stats for sports fans',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const headersList = headers()
    const currentRoute = headersList.get('x-current-route')

    const user = null

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header currentRoute={currentRoute} user={user} />
                {children}
                <Footer />
            </body>
        </html>
    )
}
