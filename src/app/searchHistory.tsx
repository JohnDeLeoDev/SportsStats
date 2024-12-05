import React from 'react'
import { getQueries } from '@/app/helpers/getQueries'
import { appContext } from '@/app/app'

export default function SearchHistory() {
    const [pastQueries, setPastQueries] = React.useState<Query[] | undefined>(
        undefined
    )
    const { user, setLocalUser, userSession } = React.useContext(appContext)

    type Query = {
        id: string
        query: string
        created_at: string
    }

    React.useEffect(() => {
        async function fetchQueries() {
            if (userSession) {
                const res = await getQueries(userSession)
                if (res === 'Error: User is not logged in') {
                    console.error('User is not logged in')
                    setLocalUser(null)
                    setPastQueries([])
                } else if (res.message === 'The incoming token has expired') {
                    console.error('User session has expired')
                    setLocalUser(null)
                    setPastQueries([])
                } else {
                    setPastQueries(res)
                }
                console.log(res)
            }
        }

        if (typeof window !== 'undefined') {
            fetchQueries()
        }
    }, [user, setLocalUser, userSession])

    if (typeof window === 'undefined') {
        return null
    }

    if (!user) {
        return (
            <div>
                <p>Please sign in to view past queries.</p>
                <a href="/signin">Sign in</a>
            </div>
        )
    }

    if (pastQueries) {
        return (
            <div>
                <hr className="w-full my-8 mb-8" />
                <h2 className="text-2xl font-bold mb-4">Search History</h2>
                <div className="flex gap-4 sm:items-start w-full flex-wrap">
                    {pastQueries.slice(0, 10).map((query, index) => (
                        <div
                            key={index}
                            className={
                                'cursor-pointer bg-white p-4 shadow-lg rounded-lg hover:bg-gray-200'
                            }
                            onClick={() => {
                                window.location.href = `/search?q=${query.query}`
                            }}
                        >
                            <p>{query.query}</p>
                            <p>{query.created_at}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
