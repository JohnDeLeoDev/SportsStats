import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { headers } from 'next/headers'
import Head from 'next/head'
import React from 'react'
import App from './app'

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

    return (
        <html lang="en">
            <Head>
                <title>{String(metadata.title) ?? 'Default Title'}</title>
                <meta
                    name="description"
                    content={metadata.description ?? 'Default Description'}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased `}
            >
                <App currentRoute={currentRoute}>{children}</App>
            </body>
        </html>
    )
}
