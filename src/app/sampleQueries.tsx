import React from 'react'
import searchRequest from '@/app/helpers/searchRequest'
import {appContext} from './app'
import {style} from "@/app/style";

export default function SampleQueries(props: { similarQueries?: string[] }) {
    const {
        userSession,
        setSearchTriggered,
        setSearchResponse,
        setSearchQuery,
        setSearchDisplay,
        setSearchType,
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
            setSearchType('general')
            setSearchTriggered(true)
            setSearchResponse(null)
            setSearchDisplay(null)


            try {
                if (userSession) {
                    const res = await searchRequest(query, 'general', userSession)
                    setSearchResponse(res)
                    setSearchTriggered(false)
                } else {
                    const res = await searchRequest(query, 'general')
                    setSearchResponse(res)
                    setSearchTriggered(false)
                }
            } catch (error) {
            }
        },
        [
            setSearchQuery,
            setSearchTriggered,
            setSearchResponse,
            setSearchDisplay,
            userSession,
            setSearchType,
        ]
    )

    return (
        <div
            className={''}
            data-testid={'sample-queries'}
        >
            <hr className={style.hr}/>
            <h2 className={style.h2}


            >{title}</h2>
            <ul className={'mt-4'} data-testid={"sample-queries-list"}>
                {queries.map((query, index) => (
                    <li key={index}>
                        <button
                            className={'text-blue-500 hover:text-blue-700'}
                            onClick={() => handleSearch(query)}
                            data-testid={'sample-query'}
                        >
                            {query.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
