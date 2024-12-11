'use client'
import React from 'react'
import {appContext} from '../app'
import {getQueries} from '../helpers/getQueries'
import {style} from "@/app/style";
import {updateInfo, verifyInfo} from "@/app/helpers/updateInfo";
import {userPool} from "@/app/helpers/userpool";
import {CognitoUserSession} from "amazon-cognito-identity-js";


function PastQueries() {
    const {user, setUser, userSession} = React.useContext(appContext)
    const [queries, setQueries] = React.useState<Query[]>([])
    const [loading, setLoading] = React.useState(true)
    const {setLocalQuery} = React.useContext(appContext)


    type Query = {
        id: string
        query: string
        created_at: string
    }

    React.useEffect(() => {
        async function fetchQueries() {
            if (userSession) {
                const res = await getQueries(userSession)
                await res
                if (res === 'Error: User is not logged in') {
                    setUser(null)
                    return
                }
                if (res.message === 'The incoming token has expired') {
                    setUser(null)
                    return
                }
                setQueries(res)
                setLoading(false)
            }
        }

        fetchQueries()
    }, [user, setUser, userSession])

    function handleViewQuery(pastQuery: string) {
        setLocalQuery(pastQuery)

        // load home page with searchTriggered set to true
        window.location.href = '/'
    }

    if (!user) {
        return (
            <div>
                <p>Please sign in to view past queries.</p>
                <a href="/signin">Sign in</a>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 items-center sm:items-start">
            <h2 className="text-2xl sm:text-3xl font-bold">Past Queries</h2>
            {loading ? (
                <p>Loading...</p>
            ) : queries.length > 0 ? (
                <table className="table-auto max-w-lg">
                    <thead>
                    <tr>
                        <th className="px-4 py-0">Date</th>
                        <th className="px-4 py-0">Query</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queries.map((query: Query, index: number) => (
                        <tr key={index}>
                            <td className="px-4 py-0">
                                {new Date(
                                    query.created_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-0">{query.query}</td>
                            <td className="">
                                <button
                                    onClick={() =>
                                        handleViewQuery(query.query)
                                    }
                                    className="
                                          m-2 p-2  text-red-800 rounded-lg text-nowrap hover:bg-red-800 hover:text-white"
                                >
                                    Search Again
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No past queries.</p>
            )}
        </div>
    )
}

export default function Dashboard() {
    const {user, userSession, setLocalUser, setUser} = React.useContext(appContext)
    const [loading, setLoading] = React.useState(true)
    const [changeEmail, setChangeEmail] = React.useState(false)
    const [changePassword, setChangePassword] = React.useState(false)

    const [emailOne, setEmailOne] = React.useState('')
    const [emailTwo, setEmailTwo] = React.useState('')
    const [currentPassword, setCurrentPassword] = React.useState('')
    const [passwordOne, setPasswordOne] = React.useState('')
    const [passwordTwo, setPasswordTwo] = React.useState('')
    const [verificationNeeded, setVerificationNeeded] = React.useState(false)
    const [missingFields, setMissingFields] = React.useState(false)
    const [passwordsMatch, setPasswordsMatch] = React.useState(true)
    const [emailsMatch, setEmailsMatch] = React.useState(true)
    const [properEmail, setProperEmail] = React.useState(true)
    const [properEmailFlag, setProperEmailFlag] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [verificationCode, setVerificationCode] = React.useState('')
    const [showInputs, setShowInputs] = React.useState(true)

    const handleTextInput = React.useCallback(
        (id: string, value: string) => {
            const input = value
            switch (id) {
                case 'emailOne':
                    setEmailOne(input)
                    console.log('emailOne:', emailOne)
                    setProperEmailFlag(false)
                    break
                case 'emailTwo':
                    setEmailTwo(input)
                    console.log('emailTwo:', emailTwo)
                    setProperEmailFlag(false)
                    break
                case 'passwordOne':
                    setPasswordOne(input)
                    break
                case 'passwordTwo':
                    setPasswordTwo(input)
                    break
                case 'verificationCode':
                    setVerificationCode(input)
                    break
                case 'currentPassword':
                    setCurrentPassword(input)
                    break
            }

        }, [emailOne, emailTwo]
    )

    const checkEmailsMatch = React.useCallback(() => {
        if (emailOne === emailTwo) {
            console.log('emails match')
            setEmailsMatch(true)
        } else {
            console.log('emails do not match')
            setEmailsMatch(false)
        }
    }, [emailOne, emailTwo])

    React.useEffect(() => {
        checkEmailsMatch()
    }, [emailOne, emailTwo, checkEmailsMatch])

    React.useEffect(() => {
        checkPasswordsMatch()
    }, [passwordOne, passwordTwo, checkPasswordsMatch])

    React.useEffect(() => {
        if (user !== undefined) {
            setLoading(false)
        }
    }, [user])

    if (loading) {
        return <p>Loading...</p>
    }

    function handleEmailChange() {
        setChangeEmail(!changeEmail)
    }

    function handlePasswordChange() {
        setChangePassword(!changePassword)
    }


    function checkPasswordsMatch() {
        if (passwordOne === passwordTwo) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }

    function checkCurrentPassword() {
        if (currentPassword) {
            setMissingFields(false)
        }
    }

    function checkProperEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(emailOne)) {
            setProperEmail(true)
        } else {
            setProperEmail(false)
        }
    }


    async function handleUpdate(id: string) {
        if (id === 'email') {

            // check if any fields are missing
            if (emailOne === '' || emailTwo === '') {
                setMissingFields(true)
                console.log('emails missing')
                return
            }

            // check if the emails match
            if (emailOne !== emailTwo) {
                setEmailsMatch(false)
                return
            }

            checkProperEmail()

            if (!properEmail) {
                setProperEmailFlag(true)
                return
            }

            // remove whitespace from email
            setEmailOne(emailOne.trim())

            // update email
            if (userSession) {
                const result = await updateInfo(userSession, 'email', emailOne);
                // if result err, set success to false
                if (result === 'success') {
                    console.log('Email change request sent successfully')
                    setVerificationNeeded(true)
                    setShowInputs(false)
                } else {
                    console.error('Error updating email:', result)
                    setSuccess(false)
                }
            }
        } else if (id === 'password') {
            checkCurrentPassword()

            if (!currentPassword) {
                setMissingFields(true)
                console.log('current password missing')
                return
            }

            // check if any fields are missing
            if (passwordOne === '' || passwordTwo === '') {
                console.log('passwords missing')
                setMissingFields(true)
                return
            }

            if (!passwordsMatch) {
                return
            }

            // remove whitespace from password
            setPasswordOne(passwordOne.trim())

            // update password
            if (userSession) {
                const result = await updateInfo(userSession, 'password', undefined, currentPassword, passwordOne);
                // if result err, set success to false
                if (result === 'success') {
                    console.log('Password change request sent successfully')
                    setSuccess(true)
                    setShowInputs(false)
                } else {
                    console.error('Error updating password:', result)
                    setSuccess(false)
                }
            }

        }
    }

    async function handleVerify(id: string) {
        if (userSession) {
            const result = await verifyInfo(userSession, id, verificationCode);
            if (result === 'success') {
                console.log('Verification successful')
                setVerificationNeeded(false)
                setSuccess(true)
                const cognitoUser = userPool.getCurrentUser();
                if (!cognitoUser) {
                    throw new Error('No current user');
                }
                // update local user info
                cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                    if (err || !session || !session.isValid()) {
                        console.error('User session is invalid or expired:', err);
                        return;
                    }
                    const attributes = session.getIdToken().payload
                    if (attributes.email !== emailOne) {
                        // wait 2000ms for the email to update in cognito
                        setTimeout(() => {
                            cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                                if (err || !session || !session.isValid()) {
                                    console.error('User session is invalid or expired:', err);
                                    return;
                                }
                                const attributes = session.getIdToken().payload
                                setLocalUser({
                                    email: attributes.email,
                                    firstName: attributes.given_name,
                                    lastName: attributes.family_name,
                                })
                                setUser({
                                    email: attributes.email,
                                    firstName: attributes.given_name,
                                    lastName: attributes.family_name,
                                })
                                setChangeEmail(false)
                                setEmailOne('')
                                setEmailTwo('')
                                setVerificationCode('')
                                setSuccess(true)
                            })
                        })
                    } else {
                        setLocalUser({
                            email: attributes.email,
                            firstName: attributes.given_name,
                            lastName: attributes.family_name,
                        })
                        setUser({
                            email: attributes.email,
                            firstName: attributes.given_name,
                            lastName: attributes.family_name,
                        })
                        setSuccess(true)
                        setEmailOne('')
                        setEmailTwo('')
                        setVerificationCode('')
                        setChangeEmail(false)
                    }
                })
            }
        }
    }


    return (
        <div
            className={style.pageCard}>
            <main className={style.innerCard}>
                <h1 className={style.h1}>
                    Dashboard
                </h1>
                {user ? (
                    <div>
                        <p className={style.p}>
                            Welcome, {user.firstName} {user.lastName}.
                        </p>
                        <hr className="w-full"/>
                        <h3 className={style.h3}>
                            User Information
                        </h3>
                        <div className={style.statSectionDiv}>
                            <p className={style.smallP}>
                                <strong>First Name:</strong> {user.firstName}
                            </p>
                            <p className={style.smallP}>
                                <strong>Last Name:</strong> {user.lastName}
                            </p>
                            <p className={style.smallP}>
                                <strong>Email:</strong> {user.email} <a
                                onClick={handleEmailChange} className={style.a}
                            > Edit</a>
                            </p>
                            {changeEmail ? (
                                <div className={style.infoChange}>
                                    <div className={style.passwords}>
                                        {showInputs ? (
                                            <>
                                                <div className={'flex'}>
                                                    <input
                                                        className={style.infoChangeInput}
                                                        type="email"
                                                        placeholder="New email"
                                                        onChange={(e) => handleTextInput('emailOne', e.target.value)}
                                                    />
                                                    <input
                                                        className={style.infoChangeInput}
                                                        type="email"
                                                        placeholder="Confirm new email"
                                                        onChange={(e) => handleTextInput('emailTwo', e.target.value)}
                                                    />
                                                    <div>
                                                        <button
                                                            className={style.searchButton + style.infoChangeButton}
                                                            onClick={() => handleUpdate('email')}
                                                        >Update
                                                        </button>
                                                    </div>
                                                    {missingFields ? (
                                                        <p className={style.smallP + ' text-red-800'}>
                                                            Please fill out all fields.
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </>
                                        ) : null}


                                        {properEmailFlag ? (
                                            <p className={style.smallP + ' text-red-800'}>
                                                Please enter a proper email address.
                                            </p>
                                        ) : null}
                                        {!emailsMatch ? (
                                            <p className={style.smallP + ' text-red-800'}>
                                                Emails do not match.
                                            </p>
                                        ) : null}
                                        {verificationNeeded ? (
                                            <>
                                                <p className={style.smallP}>
                                                    A verification email has been sent to your new email address. Enter
                                                    the verification code below.
                                                </p>
                                                <div>
                                                    <input
                                                        className={style.infoChangeInput}
                                                        type="text"
                                                        placeholder="Verification code"
                                                        onChange={(e) => handleTextInput('verificationCode', e.target.value)}
                                                    />
                                                    <button
                                                        className={style.searchButton + style.infoChangeButton}
                                                        onClick={() => handleVerify('email')}
                                                    >Verify
                                                    </button>
                                                </div>

                                            </>
                                        ) : null}


                                    </div>

                                </div>
                            ) : null}

                            <p className={style.smallP}>
                                <strong>Password:</strong> ******** <a
                                onClick={handlePasswordChange}
                                className={style.a}
                            > Edit</a>
                            </p>
                            {changePassword ? (
                                <div
                                    className={style.infoChange}
                                >
                                    <div className={style.passwords}>
                                        <input
                                            className={style.infoChangeInput}
                                            type="password"
                                            placeholder="Current password"
                                            onChange={(e) => handleTextInput('password', e.target.value)}
                                        />
                                        <input
                                            className={style.infoChangeInput}
                                            type="password"
                                            placeholder="New password"
                                            onChange={(e) => handleTextInput('password', e.target.value)}
                                        />
                                        <input
                                            className={style.infoChangeInput}
                                            type="password"
                                            placeholder="Confirm new password"
                                            onChange={(e) => handleTextInput('password', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className={style.searchButton + style.infoChangeButton}
                                        >Update
                                        </button>
                                    </div>


                                </div>
                            ) : null}

                        </div>
                        {success ? (
                            <p className={style.smallP + ' text-green-800'}>
                                Email updated successfully.
                            </p>
                        ) : null}

                        <PastQueries/>
                    </div>
                ) : (
                    <div className='flex max-w-[400px]'>
                        <p className={style.p}>
                            Please <a className={style.a} href="/signin">sign in</a> or <a className={style.a}
                                                                                           href={'/signup'}>sign
                            up</a> to view your profile.
                        </p>


                    </div>
                )}
            </main>
        </div>
    )
}
