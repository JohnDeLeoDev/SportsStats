'use client'
import React from 'react'
import { appContext } from '../app'

export default function Profile() {
    const { user } = React.useContext(appContext)

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    Dashboard
                </h1>
                {user ? (
                    <div className="flex flex-col gap-4 items-center sm:items-start">
                        <p className="text-lg sm:text-xl text-center sm:text-left">
                            Welcome, {user.firstName} {user.lastName}.
                        </p>
                        <p className="text-lg sm:text-xl text-center sm:text-left">
                            Your email address is {user.email}.
                        </p>
                    </div>
                ) : (
                    <p className="text-lg sm:text-xl text-center sm:text-left">
                        Please sign in to view your profile.
                    </p>
                )}
            </main>
        </div>
    )
}
