'use client'
import React from 'react'
import SearchResults from './searchResults'
import searchRequest from './helpers/searchRequest'
import { appContext } from './app'

export default function Home() {
    const {
        searchQuery,
        setSearchQuery,
        searchTriggered,
        setSearchTriggered,
        searchResponseReceived,
        setSearchResponseReceived,
    } = React.useContext(appContext)

    function handleSearch(query: string) {
        setSearchTriggered(true)

        // wait for the search request to complete
        searchRequest(query).then(() => {
            setSearchResponseReceived(true)
            console.log('Search response received.')
        })
    }

    function handleTextInput(query: string) {
        console.log(query)
        setSearchQuery(query)
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    SportsStats
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>
                <div className="flex flex-row gap-4 items-center sm:items-start w-full">
                    <input
                        className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                        placeholder="Search for a statistic"
                        onChange={(e) => handleTextInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(searchQuery)
                            }
                        }}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded-lg"
                        onClick={() => handleSearch(searchQuery)}
                    >
                        Search
                    </button>
                </div>
                {searchTriggered && searchResponseReceived && <SearchResults />}
            </main>
        </div>
    )
}
