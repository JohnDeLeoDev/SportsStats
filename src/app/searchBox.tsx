import React from 'react'
import searchRequest from '@/app/helpers/searchRequest'
import { appContext } from './app'

export default function SearchBox() {
    const {
        searchQuery,
        setSearchQuery,
        searchTriggered,
        setSearchTriggered,
        searchResponse,
        setSearchResponse,
        userSession,
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
                if (userSession) {
                    const res = await searchRequest(query, userSession)
                    console.log(res)
                    setSearchResponse(res)
                } else {
                    const res = await searchRequest(query)
                    setSearchResponse(res)
                }
            } catch (error) {
                console.error('Search failed', error)
            }
        },
        [setSearchTriggered, userSession, setSearchResponse]
    )

    React.useEffect(() => {
        if (searchTriggered) {
            handleSearch(searchQuery)
        }
    }, [searchTriggered, searchQuery, handleSearch])

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchQuery])
    return (
        <div className="flex flex-row gap-4 items-center sm:items-start w-full transition-all duration-2000 ease-in-out transform">
            <input
                className="w-full p-2 text-lg border-2 border-gray-300
                        focus:outline-none focus:border-red-800
                        rounded-lg "
                data-testid="search-field"
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
            {searchTriggered && !searchResponse ? (
                <button
                    className="p-2 bg-blue-300
                        hover:bg-gray-800
                        text-white rounded-lg self-stretch transition-all duration-2000 ease-in-out transform"
                >
                    Searching...
                </button>
            ) : (
                <button
                    className="p-2 bg-red-800
                        hover:bg-gray-800
                        text-white rounded-lg self-stretch transition-all duration-2000 ease-in-out transform"
                    onClick={() => handleSearch(searchQuery)}
                >
                    Search
                </button>
            )}
        </div>
    )
}
