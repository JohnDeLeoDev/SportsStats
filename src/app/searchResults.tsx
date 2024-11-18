import { appContext } from './app'
import React from 'react'

export default function SearchResults() {
    const { searchResponse, searchQuery } = React.useContext(appContext)

    function displaySearchResults() {
        if (!searchResponse) {
            console.error('No search results found')
            return
        }
        if ('message' in searchResponse) {
            return (
                <div
                    className="
                text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform"
                >
                    <h2>
                        An error occurred while fetching the search results.
                    </h2>
                    <p className={'text-lg'}>
                        Message: {String(searchResponse.message)}
                    </p>
                </div>
            )
        }

        const results = searchResponse.result.rows
        if (results.length > 0) {
            return (
                <div className="mt-10 w-full flex flex-col gap-4 items-center ">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        Search Results
                    </h2>
                    <table className="table-auto w-8/12 min-w-400">
                        <thead>
                            <tr>
                                {Object.keys(results[0]).map((key, index) => (
                                    <th key={index} className="px-4 py-2">
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <td
                                            key={index}
                                            className="border px-4 py-2"
                                        >
                                            {String(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div className="text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                <h2>No search results found for &quot;{searchQuery}&quot;.</h2>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 items-center sm:items-start transition-all duration-2000 ease-in-out transform">
            {displaySearchResults()}
        </div>
    )
}
