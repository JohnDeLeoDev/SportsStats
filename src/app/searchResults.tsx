import { appContext } from './app'
import React from 'react'
import { tableDict } from '@/app/types/tableDict'

export default function SearchResults() {
    const { searchQuery, searchDisplay } = React.useContext(appContext)

    function displaySearchResults() {
        if (!searchDisplay) {
            console.log('No search results')
            return null
        }
        if ('errorMessage' in searchDisplay) {
            return (
                <div
                    className="
                text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform"
                >
                    <h2>
                        An error occurred while fetching the search results.
                    </h2>
                    <p className={'text-lg'}>
                        Message: {String(searchDisplay.errorMessage)}
                    </p>
                </div>
            )
        }

        const results = searchDisplay.result.rows
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
                                        {tableDict[key] || key}
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
        return null
    }

    return (
        <div className="flex flex-col gap-8 items-center sm:items-start transition-all duration-2000 ease-in-out transform">
            {displaySearchResults()}
        </div>
    )
}
