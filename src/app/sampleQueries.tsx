import React from 'react'
import searchRequest from '@/app/helpers/searchRequest'
import { appContext } from './app'

export default function SampleQueries(props: { similarQueries?: string[] }) {
    const {
        userSession,
        setSearchTriggered,
        setSearchResponse,
        setSearchQuery,
        setSearchDisplay,
    } = React.useContext(appContext)
    const similarQueries = props.similarQueries

    const sampleQueries = [
        'Who led the American League in home runs in 2020?',
        'Who had the most hits in the National League in 1990?',
        'What pitcher had the most strikeouts in the American League in 2000?',
        'What pitcher had the most wins in the American League in 1920?',
    ]

    let title
    let queries

    if (similarQueries) {
        queries = similarQueries
        title = 'Similar Queries'
    } else {
        queries = sampleQueries
        title = 'Sample Queries'
    }

    const handleSearch = React.useCallback(
        async (query: string) => {
            setSearchQuery(query)
            setSearchTriggered(true)
            setSearchResponse(null)
            setSearchDisplay(null)

            try {
                if (userSession) {
                    const res = await searchRequest(query, userSession)
                    setSearchResponse(res)
                    setSearchTriggered(false)
                } else {
                    const res = await searchRequest(query)
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

    return (
        <div className={'mt-10'}>
            <h2 className={'text-2xl font-bold'}>{title}</h2>
            <ul className={'mt-4'}>
                {queries.map((query, index) => (
                    <li key={index}>
                        <button
                            className={'text-blue-500 hover:text-blue-700'}
                            onClick={() => handleSearch(query)}
                        >
                            {query}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
