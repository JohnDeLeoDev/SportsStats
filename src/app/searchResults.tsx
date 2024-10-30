import { appContext } from './app'
import React from 'react'
import { Player } from './types/player'
import { Team } from './types/team'

export default function SearchResults() {
    const { searchResponse, searchQuery } = React.useContext(appContext)

    console.log(searchResponse)

    function displaySearchResults() {
        if (!searchResponse) {
            console.error('No search results found')
            return
        }

        if (
            Array.isArray(searchResponse) &&
            (searchResponse as Player[]).length > 0
        ) {
            // sort the search results by last name then by first name
            ;(searchResponse as Player[]).sort((a, b) => {
                if (a.nameLast && b.nameLast && a.nameLast === b.nameLast) {
                    if (!a.nameFirst) return 1
                    if (!b.nameFirst) return -1
                    return a.nameFirst.localeCompare(b.nameFirst)
                }
                if (
                    !a ||
                    !b ||
                    a.nameLast === undefined ||
                    b.nameLast === undefined
                ) {
                    return 0
                }
                return a.nameLast.localeCompare(b.nameLast)
            })
        }

        if (
            Array.isArray(searchResponse) &&
            (searchResponse as Team[]).length > 0
        ) {
            ;(searchResponse as Team[]).sort((a, b) => {
                if (a.yearid && b.yearid && a.yearid === b.yearid) {
                    if (!a.city) return 1
                    if (!b.city) return -1
                    return a.city.localeCompare(b.city)
                }
                if (
                    !a ||
                    !b ||
                    a.yearid === undefined ||
                    b.yearid === undefined
                ) {
                    return 0
                }
                return a.yearid - b.yearid
            })
        }

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
                                        {typeof result === 'object' &&
                                        result !== null &&
                                        'yearID' in result
                                            ? (
                                                  result as {
                                                      yearID: React.ReactNode
                                                  }
                                              ).yearID
                                            : ''}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {'name' in result ? result.name : ''}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {'franchID' in result
                                            ? (
                                                  result as {
                                                      franchID: React.ReactNode
                                                  }
                                              ).franchID
                                            : ''}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {'teamID' in result
                                            ? (
                                                  result as {
                                                      teamID: React.ReactNode
                                                  }
                                              ).teamID
                                            : ''}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {'teamIDBR' in result
                                            ? (
                                                  result as {
                                                      teamIDBR: React.ReactNode
                                                  }
                                              ).teamIDBR
                                            : ''}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {'teamIDlahman45' in result
                                            ? (
                                                  result as {
                                                      teamIDlahman45: React.ReactNode
                                                  }
                                              ).teamIDlahman45
                                            : ''}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {'teamIDretro' in result
                                            ? (
                                                  result as {
                                                      teamIDretro: React.ReactNode
                                                  }
                                              ).teamIDretro
                                            : ''}
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
