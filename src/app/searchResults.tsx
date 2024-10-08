import { appContext } from './app'
import React from 'react'

export default function SearchResults() {
    const { searchResponse, searchQuery } = React.useContext(appContext)

    console.log(searchResponse)

    function displaySearchResults() {
        if (!searchResponse) {
            console.error('No search results found')
            return
        }

        // sort the search results by year then by city
        searchResponse.sort((a, b) => {
            if (a && b && a.yearid === b.yearid) {
                if (!a || !a.city) return 1
                if (!b || !b.city) return -1
                return a.city.localeCompare(b.city)
            }
            if (!a || !b || a.yearid === undefined || b.yearid === undefined) {
                return 0
            }
            return a.yearid - b.yearid
        })

        return (
            <div className="flex flex-col gap-8 items-center sm:items-start transition-all duration-2000 ease-in-out transform">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                    Search Results
                </h1>
                <p className="text-xl sm:text-2xl text-center sm:text-left font-semibold transition-all duration-2000 ease-in-out transform">
                    Search query: {searchQuery}
                </p>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Year</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Franchise ID</th>
                            <th className="px-4 py-2">Team ID</th>
                            <th className="px-4 py-2">Team ID BR</th>
                            <th className="px-4 py-2">Team ID FG</th>
                            <th className="px-4 py-2">Team ID Retro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResponse.map((result, index) => {
                            if (!result) {
                                return null
                            }
                            return (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {result.yearid}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.city}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.franchid}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.teamid}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.teamidbr}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.teamidfg}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.teamidretro}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col gap-8 row-start-2 items-start transition-all duration-2000 ease-in-out transform w-full p-20
            justify-items-center text-center 
        h-full align-middle justify-items-center text-center
        
        "
        >
            {searchResponse ? (
                displaySearchResults()
            ) : (
                <div className="text-4xl sm:text-5xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                    No results found
                </div>
            )}
        </div>
    )
}
