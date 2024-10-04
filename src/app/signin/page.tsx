'use client'

import { signIn } from '../helpers/signIn'
import React from 'react'
import { appContext } from '../app'
import { User } from '../types/user'

function MissingFields() {
    return (
        <div className="p-2 bg-red-500 text-white rounded-lg w-full">
            Please fill in all fields.
        </div>
    )
}

export default function Signin() {
    const {
        user,
        setUser,
        searchQuery,
        setSearchQuery,
        searchTriggered,
        setSearchTriggered,
        searchResponseReceived,
        setSearchResponseReceived,
    } = React.useContext(appContext)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [missingFields, setMissingFields] = React.useState(false)

    async function handleSignIn() {
        console.log('Signing in...')
        if (email === '' || password === '') {
            setMissingFields(true)
            return
        }
        try {
            const res = await signIn(email, password)
            if (res) {
                const userRes: User = {
                    email: email,
                    firstName: res.user.first_name,
                    lastName: res.user.last_name,
                    token: res.token,
                    password: null,
                }
                // update the user in the app context
                setUser(userRes)

                // redirect to the home page
                window.location.href = '/'
            }
        } catch (error) {
            console.error('Sign in failed', error)
        }
    }

    return (
        <appContext.Provider
            value={{
                user,
                setUser,
                searchQuery,
                setSearchQuery,
                searchTriggered,
                setSearchTriggered,
                searchResponseReceived,
                setSearchResponseReceived,
            }}
        >
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                        Sign In
                    </h1>
                    <p className="text-lg sm:text-xl text-center sm:text-left">
                        Enter your email address and password to sign in.
                    </p>

                    <div className="flex flex-column gap-4 items-center sm:items-start w-full flex-wrap max-w-[600px]">
                        <div className="flex flex-row gap-4 items-center sm:items-start w-full mt-3 ">
                            <input
                                className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                                placeholder="Email Address"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (missingFields) {
                                        setMissingFields(false)
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSignIn()
                                    }
                                }}
                            />
                            <input
                                className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (missingFields) {
                                        setMissingFields(false)
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSignIn()
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-row gap-4 items-center sm:items-start w-full justify-between mb-3">
                            <a href="/signup" className="text-blue-500">
                                Don&#39;t have an account? Sign up here.
                            </a>
                            <a
                                href="/signin/forgot-password"
                                className="text-blue-500"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            className="p-3 bg-blue-500 text-white rounded-lg w-full"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                    </div>
                    {missingFields && <MissingFields />}
                </main>
            </div>
        </appContext.Provider>
    )
}
