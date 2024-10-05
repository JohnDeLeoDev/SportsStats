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

    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleTextInput = React.useCallback(
        (query: string) => {
            setSearchQuery(query)
            // focus on the input field
        },
        [setSearchQuery]
    )

    const handleSearch = React.useCallback(
        async (query: string) => {
            setSearchTriggered(true)
            try {
                console.log('Searching for:', query)
                const res = await searchRequest(query)
                if (res) {
                    setSearchResponseReceived(true)
                }
            } catch (error) {
                console.error('Search failed', error)
            }
        },
        [setSearchTriggered, setSearchResponseReceived]
    )

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchQuery])

    function HomePage() {
        return (
            <main
                className="flex flex-col gap-8 row-start-2 items-center  transition-all duration-2000 ease-in-out transform w-full align-middle justify-items-center text-center 
        "
            >
                <div
                    className="flex flex-col gap-8  items-center sm:items-start transition-all duration-2000 ease-in-out transform max-w-lg 
            "
                >
                    <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                        SportsStats
                    </h1>
                    <p className="text-lg sm:text-xl text-center sm:text-left transition-all duration-2000 ease-in-out transform">
                        Welcome to SportsStats, where your sports statistics are
                        a search away.
                    </p>
                    <div className="flex flex-row gap-4 items-center sm:items-start w-full transition-all duration-2000 ease-in-out transform">
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 
                        focus:outline-none focus:border-red-800
                        rounded-lg "
                            placeholder="Search for a statistic"
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => handleTextInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(searchQuery)
                                }
                            }}
                        />
                        <button
                            className="p-2 bg-red-800 
                        hover:bg-gray-800 
                        text-white rounded-lg self-stretch transition-all duration-2000 ease-in-out transform"
                            onClick={() => handleSearch(searchQuery)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)] transition-all duration-2000 ease-in-out transform">
            {searchTriggered === false ? <HomePage /> : null}
            {searchResponseReceived === true ? <SearchResults /> : null}
        </div>
    )
}
