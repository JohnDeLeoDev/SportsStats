'use client'
import PlayerComponent from '../components/Player'
import searchPlayer from '../helpers/searchPlayer'
import { appContext } from '../app'
import React from 'react'
import { Player } from '../types/player'
import { PlayerResult } from '../types/response'

export default function Dev() {
    const {
        userSession,
        playerQuery,
        setPlayerQuery,
        playerResponse,
        setPlayerResponse,
        playerResult,
        setPlayerResult,
    } = React.useContext(appContext)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleTextInput = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPlayerQuery(event.target.value)
            console.log('Player query:', playerQuery)
            // focus on the input field
        },
        [setPlayerQuery, playerQuery]
    )

    const handleSearch = React.useCallback(
        async (query: string) => {
            try {
                const res = await searchPlayer(userSession, query)
                if (res) {
                    setPlayerResponse(res)
                }
            } catch (error) {
                console.error('Search failed', error)
            }
        },
        [setPlayerResponse, userSession]
    )

    React.useEffect(() => {
        if (playerResponse && playerResponse.length > 0) {
            const playerResults: PlayerResult[] = []
            playerResponse.forEach((result) => {
                if (result !== null) {
                    playerResults.push(result as PlayerResult)
                }
            })
            const players: Player[] = playerResults.map((result) => ({
                nameFirst: result.nameFirst,
                nameLast: result.nameLast,
                birthYear: result.birthYear,
                birthMonth: result.birthMonth,
                birthDay: result.birthDay,
                birthCity: result.birthCity,
                birthCountry: result.birthCountry,
                birthState: result.birthState,
                deathYear: result.deathYear,
                deathMonth: result.deathMonth,
                deathDay: result.deathDay,
                deathCountry: result.deathCountry,
                deathState: result.deathState,
                deathCity: result.deathCity,
                weight: result.weight,
                height: result.height,
                bats: result.bats,
                throws: result.throws,
                debut: result.debut,
                bbrefID: result.bbrefID,
                finalGame: result.finalGame,
            }))
            setPlayerResult(players)
        }
    }, [playerResponse, setPlayerResult])

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <PlayerComponent
                player={{
                    nameFirst: 'Babe',
                    nameLast: 'Ruth',
                    birthYear: 1895,
                    birthMonth: 2,
                    birthDay: 6,
                    birthCity: 'Baltimore',
                    birthCountry: 'USA',
                    birthState: 'MD',
                    deathYear: 1948,
                    deathMonth: 8,
                    deathDay: 16,
                    deathCountry: 'USA',
                    deathState: 'NY',
                    deathCity: 'New York',
                    weight: 215,
                    height: 74,
                    bats: 'L',
                    throws: 'L',
                    debut: '1914-07-11',
                    bbrefID: 'ruthba01',
                    finalGame: '1935-05-30',
                }}
            />
            <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>Search for a player</h1>
                <input
                    className=" w-full p-2 text-lg border-2 border-gray-300 rounded-lg "
                    ref={inputRef}
                    type="text"
                    onChange={handleTextInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(playerQuery)
                        }
                    }}
                />
                <button
                    onClick={() => handleSearch(playerQuery)}
                    className="p-2 bg-red-800 hover:bg-gray-800 text-white rounded-lg self-stretch"
                >
                    Search
                </button>

                {playerResult ? (
                    <div>
                        {playerResult.map((player: Player, index: number) => (
                            <PlayerComponent key={index} player={player} />
                        ))}
                    </div>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    )
}
