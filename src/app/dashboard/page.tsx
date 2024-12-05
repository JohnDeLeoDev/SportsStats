'use client'
import React from 'react'
import { appContext } from '../app'
import { getQueries } from '../helpers/getQueries'

function PastQueries() {
    const { user, setUser, userSession } = React.useContext(appContext)
    const [queries, setQueries] = React.useState<Query[]>([])
    const [loading, setLoading] = React.useState(true)
    const { setLocalQuery } = React.useContext(appContext)

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
                console.log(res)
                if (res === 'Error: User is not logged in') {
                    console.error('User is not logged in')
                    setUser(null)
                    return
                }
                if (res.message === 'The incoming token has expired') {
                    console.error('User session has expired')
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
        console.log('View query')
        console.log(pastQuery)
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
    const { user } = React.useContext(appContext)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (user !== undefined) {
            setLoading(false)
        }
    }, [user])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="h-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
            <main className="m-auto mt-40  items-center  w-6/12 bg-white shadow rounded-lg">
                <div className={'p-10 w-full'}>
                    <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                        Dashboard
                    </h1>
                    {user ? (
                        <div className="flex flex-col gap-4 items-center sm:items-start">
                            <p className="text-lg sm:text-xl text-center sm:text-left mt-4">
                                Welcome, {user.firstName} {user.lastName}.
                            </p>
                            <hr className="w-full" />

                            <PastQueries />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 items-center sm:items-start">
                            <p className="text-lg sm:text-xl text-center sm:text-left">
                                Please sign in to view your profile.
                            </p>
                            <a href="/signin">Sign in</a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
