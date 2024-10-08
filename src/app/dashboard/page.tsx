'use client'
import React from 'react'
import { appContext } from '../app'
import { getQueries } from '../helpers/getQueries'

function PastQueries() {
    const { user, setUser } = React.useContext(appContext)
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
            if (user) {
                const res = await getQueries(user)
                await res
                console.log(res)
                if (res === 'Error: User is not logged in') {
                    console.error('User is not logged in')
                    setUser(null)
                    return
                }
                setQueries(res)
                setLoading(false)
            }
        }

        fetchQueries()
    }, [user, setUser])

    function handleViewQuery(pastQuery: string) {
        console.log('View query')
        console.log(pastQuery)
        setLocalQuery(pastQuery)

        // load home page with searchTriggered set to true
        window.location.href = '/'
    }

    if (!user) {
        return <p>Please sign in to view past queries.</p>
    }

    return (
        <div className="flex flex-col gap-4 items-center sm:items-start">
            <h2 className="text-2xl sm:text-3xl font-bold">Past Queries</h2>
            {loading ? (
                <p>Loading...</p>
            ) : queries.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Query</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query: Query, index: number) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    {new Date(
                                        query.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">
                                    {query.query}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() =>
                                            handleViewQuery(query.query)
                                        }
                                        className="text-blue-500"
                                    >
                                        View
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

                        <PastQueries />
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
