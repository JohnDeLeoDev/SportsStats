'use client'
import React from 'react'
import {getQueries} from '@/app/helpers/getQueries'
import {appContext} from '@/app/app'
import searchRequest from "@/app/helpers/searchRequest";

export default function SearchHistory() {
    const [pastQueries, setPastQueries] = React.useState<Query[] | undefined>(
        undefined
    )
    const {
        user, setLocalUser, userSession, setSearchDisplay, setSearchResponse, setSearchTriggered, setSearchQuery
    } = React.useContext(appContext)

    type Query = {
        id: string
        query: string
        created_at: string
    }

    const handleSearch = React.useCallback(
        async (query: string) => {
            setSearchQuery(query)
            setSearchTriggered(true)
            setSearchResponse(null)
            setSearchDisplay(null)


            try {
                if (userSession) {
                    const res = await searchRequest(query, 'general', userSession)
                    setSearchResponse(res)
                    setSearchTriggered(false)
                }
            } catch (error) {
                console.error('Search failed', error)
            }
        },
        [
            setSearchQuery,
            setSearchTriggered,
            setSearchResponse,
            setSearchDisplay,
            userSession,
        ]
    )

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
                    let queries = res.reverse()
                    //remove blanks
                    queries = queries.filter((query: Query) => query.query !== '')

                    setPastQueries(queries)
                }
            }
        }

        if (typeof window !== 'undefined' && !pastQueries) {
            fetchQueries()
        }
    }, [user, setLocalUser, userSession])

    if (typeof window === 'undefined') {
        return
    }

    if (!user) {
        return
    }

    if (pastQueries) {
        return (
            <div
                data-testid="search-history"
            >
                <hr className="w-full my-8 mb-8"/>
                <h2 className="text-2xl font-bold mb-4">Search History</h2>
                <ul className="mt-4 mb-4" data-testid="search-history-list">
                    {pastQueries.slice(0, 10).map((query, index) => (
                        <li key={index}>
                            <button
                                data-testid={`search-history-item-${index}`}
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleSearch(query.query)}
                            >
                                {query.query}
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
