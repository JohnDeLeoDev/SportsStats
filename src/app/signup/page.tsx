'use client'
import {createAccount} from '../helpers/createAccount'
import {User} from '../types/user'
import React from 'react'
import {style} from "@/app/style";

export default function Signup() {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [passwordOne, setPasswordOne] = React.useState('')
    const [passwordTwo, setPasswordTwo] = React.useState('')
    const [missingFields, setMissingFields] = React.useState(false)
    const [passwordsMatch, setPasswordsMatch] = React.useState(true)
    const [emailExists, setEmailExists] = React.useState(false)
    const [properEmail, setProperEmail] = React.useState(true)
    const [properEmailFlag, setProperEmailFlag] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    function checkProperEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(email)) {
            setProperEmail(true)
        } else {
            setProperEmail(false)
        }
    }

    async function handleSignUp() {
        // check if any fields are missing
        if (
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            passwordOne === '' ||
            passwordTwo === ''
        ) {
            setMissingFields(true)
            return
        }

        // check if the passwords match
        if (passwordOne !== passwordTwo) {
            setPasswordsMatch(false)
            return
        }

        checkProperEmail()

        if (!properEmail) {
            setProperEmailFlag(true)
            return
        }

        // remove whitespace from email and password
        setEmail(email.trim())
        setPasswordOne(passwordOne.trim())
        setPasswordTwo(passwordTwo.trim())

        const user: User = {
            email,
            firstName,
            lastName,
        }

        try {
            await createAccount(user, passwordOne)
            setSuccess(true)
        } catch (error) {
            if (error === 'UsernameExistsException') {
                setEmailExists(true)
            } else {
                console.error('Error creating account:', error)
            }
        }
    }

    function AccountExists() {
        return (
            <div className="p-2 bg-red-500 text-white rounded-lg w-full">
                An account with that email address already exists.
            </div>
        )
    }

    function MissingFields() {
        return (
            <div className="p-2 bg-red-500 text-white rounded-lg w-full">
                Please fill in all fields.
            </div>
        )
    }

    function PasswordsDoNotMatch() {
        return (
            <div className="p-2 bg-red-500 text-white rounded-lg w-full">
                Passwords do not match.
            </div>
        )
    }

    function ImproperEmail() {
        return (
            <div className="p-2 bg-red-500 text-white rounded-lg w-full">
                Please enter a valid email address.
            </div>
        )
    }

    function AccountCreated() {
        return (
            <>
                <div className="p-2 bg-green-500 text-white rounded-lg w-full">
                    Your account has been created successfully.
                </div>
                <a
                    href="/signin"
                    className="text-blue-500 hover:text-blue-700 w-full  text-right
                "
                >
                    Sign In
                </a>
            </>
        )
    }

    return (
        <div
            className={style.pageCard}>
            <main className={style.innerCard}>
                <h1 className={style.h1}>
                    Sign Up
                </h1>
                <p className={style.p}>
                    Welcome to the sign up page.
                </p>
                <div className="flex flex-row gap-4 items-center sm:items-start w-full flex-wrap">
                    <div className="flex flex-row gap-4 items-center sm:items-start w-full mt-3 mb-3">
                        <input
                            className={style.searchField}
                            placeholder="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                setMissingFields(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSignUp()
                                }
                            }}
                        />
                        <input
                            className={style.searchField}
                            placeholder="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value)
                                setMissingFields(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSignUp()
                                }
                            }}
                        />
                    </div>

                    <div className="flex flex-row gap-4 items-center sm:items-start w-full flex-wrap mt-3 mb-3">
                        <input
                            className={style.searchField}
                            placeholder="Email Address"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                checkProperEmail()
                                setEmailExists(false)
                                setProperEmailFlag(false)
                                setMissingFields(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSignUp()
                                }
                            }}
                            type="email"
                        />
                        {emailExists && <AccountExists/>}
                        {properEmailFlag && <ImproperEmail/>}
                        <input
                            className={style.searchField}
                            placeholder="Password"
                            onChange={(e) => {
                                setPasswordOne(e.target.value)
                                setPasswordsMatch(true)
                                // wait for the user to finish typing before checking
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSignUp()
                                }
                            }}
                            type="password"
                        />
                        <input
                            className={style.searchField}
                            placeholder="Confirm Password"
                            onChange={(e) => {
                                setPasswordTwo(e.target.value)
                                setPasswordsMatch(true)
                                setMissingFields(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSignUp()
                                }
                            }}
                            type="password"
                        />
                        {!passwordsMatch && <PasswordsDoNotMatch/>}
                    </div>
                    {!success && (
                        <button
                            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-red-900"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    )}
                </div>
                {missingFields && <MissingFields/>}
                {success && <AccountCreated/>}
            </main>
        </div>
    )
}
