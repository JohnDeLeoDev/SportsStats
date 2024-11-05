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
                <div className="text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                    <h2>
                        An error occurred while fetching the search results.
                    </h2>
                    <p className={'text-lg'}>
                        Message: {String(searchResponse.message)}
                    </p>
                </div>
            )
        }

        if (searchResponse.data.type === 'teams') {
            const teams = searchResponse.data.results.teams || []

            return (
                <main
                    className="flex flex-col gap-8 row-start-2 items-center  transition-all duration-2000 ease-in-out transform w-full align-middle justify-items-center text-center
        "
                >
                    <div
                        className="flex flex-col gap-8  items-center sm:items-start transition-all duration-2000 ease-in-out transform max-w-lg mt-80 pt-80
            "
                    >
                        <h2 className="text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                            Search results for &quot;{searchQuery}&quot;
                        </h2>
                        <h3 className="text-lg sm:text-lg text-center sm:text-left transition-all duration-2000 ease-in-out transform">
                            Teams
                        </h3>
                        <table className="border-collapse border border-black w-full transition-all duration-2000 ease-in-out transform">
                            <thead className="border border-black bg-gray-100 transition-all duration-2000 ease-in-out transform">
                                <tr>
                                    <th>id</th>
                                    <th>yearid</th>
                                    <th>lgid</th>
                                    <th>teamid</th>
                                    <th>franchid</th>
                                    <th>teamidbr</th>
                                    <th>teamidfg</th>
                                    <th>teamidretro</th>
                                    <th>name</th>
                                    <th>city</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team) => (
                                    <tr
                                        className="border border-black transition-all duration-2000 ease-in-out transform"
                                        key={team.id}
                                    >
                                        <td>{team.id}</td>
                                        <td>{team.yearid}</td>
                                        <td>{team.lgid}</td>
                                        <td>{team.teamid}</td>
                                        <td>{team.franchid}</td>
                                        <td>{team.teamidbr}</td>
                                        <td>{team.teamidfg}</td>
                                        <td>{team.teamidretro}</td>
                                        <td>{team.name}</td>
                                        <td>{team.city}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            )
        }

        if (searchResponse.data.type === 'players') {
            const players = searchResponse.data.results.players || []

            return (
                <main className="flex flex-col gap-8 row-start-2 items-center  transition-all duration-2000 ease-in-out transform w-full align-middle justify-items-center text-center">
                    <div className="flex flex-col gap-8  items-center sm:items-start transition-all duration-2000 ease-in-out transform max-w-lg mt-80 pt-80">
                        <h2 className="text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform">
                            Search results for &quot;{searchQuery}&quot;
                        </h2>
                        <h3 className="text-lg sm:text-lg text-center sm:text-left transition-all duration-2000 ease-in-out transform">
                            Players
                        </h3>
                        <table className="border-collapse border border-black w-full transition-all duration-2000 ease-in-out transform">
                            <thead className="border border-black bg-gray-100 transition-all duration-2000 ease-in-out transform">
                                <tr>
                                    <th>id</th>
                                    <th>playerid</th>
                                    <th>birthyear</th>
                                    <th>birthcountry</th>
                                    <th>namefirst</th>
                                    <th>namelast</th>
                                    <th>weight</th>
                                    <th>height</th>
                                    <th>bats</th>
                                    <th>throws</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player) => (
                                    <tr
                                        className="border border-black transition-all duration-2000 ease-in-out transform"
                                        key={player.id}
                                    >
                                        <td>{player.id}</td>
                                        <td>{player.playerID}</td>
                                        <td>{player.birthYear}</td>
                                        <td>{player.birthCountry}</td>
                                        <td>{player.nameFirst}</td>
                                        <td>{player.nameLast}</td>
                                        <td>{player.weight}</td>
                                        <td>{player.height}</td>
                                        <td>{player.bats}</td>
                                        <td>{player.throws}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
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
