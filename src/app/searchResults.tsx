import { appContext } from './app'
import React from 'react'
import SampleQueries from '@/app/sampleQueries'
import PlayerName from '@/app/components/PlayerName'
import PlayerCard from './components/PlayerCard'
import TeamCard from './components/TeamCard'
import TeamName from '@/app/components/TeamName'

export default function SearchResults() {
    const { searchDisplay } = React.useContext(appContext)
    const [activeCard, setActiveCard] = React.useState<[string, string] | null>(
        null
    )
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 })

    const headerDict = {
        playerID: 'Player',
        teamID: 'Team',
        yearID: 'Year',
        W: 'Wins',
        L: 'Losses',
    }

    React.useEffect(() => {
        if (activeCard) {
            console.log('Active card:', activeCard)
        }
        if (clickPosition) {
            console.log('Click position:', clickPosition)
        }
    }, [activeCard, clickPosition])

    // show PlayerCard when a player is clicked
    function handleItemClick(
        event: React.MouseEvent,
        index: number,
        playerID: string
    ) {
        console.log('Clicked on player:', playerID)
        setActiveCard(['player', playerID])
        setClickPosition({
            x: event.clientX,
            y: event.clientY,
        })
    }

    function handleClickOutside() {
        if (activeCard === null) {
            return
        }
        setActiveCard(null)
        setClickPosition({ x: 0, y: 0 })
        console.log('Clicked outside')
    }

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
        if ('dbResult' in searchDisplay) {
            const results = searchDisplay.dbResult.rows
            const componentList: JSX.Element[] = []

            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    if (
                        'playerID' in results[i] &&
                        typeof results[i] === 'object' &&
                        results[i] !== null
                    ) {
                        const playerID = String(
                            (results[i] as { playerID: string }).playerID
                        )
                        componentList.push(
                            <a
                                onClick={(e) => {
                                    handleItemClick(e, i, playerID)
                                }}
                                key={i}
                                className={'cursor-pointer text-blue-500'}
                            >
                                <PlayerName key={i} playerID={playerID} />
                            </a>
                        )
                    }
                    if (
                        'teamID' in results[i] &&
                        typeof results[i] === 'object' &&
                        results[i] !== null
                    ) {
                        const teamID = String(
                            (results[i] as { teamID: string }).teamID
                        )
                        componentList.push(
                            <a
                                onClick={(e) => {
                                    setActiveCard(['team', teamID])
                                    setClickPosition({
                                        x: e.clientX,
                                        y: e.clientY,
                                    })
                                }}
                                key={i}
                                className={'cursor-pointer text-blue-500'}
                            >
                                <TeamName key={i} teamID={teamID} />
                            </a>
                        )
                    }
                }

                return (
                    <div className="relative mt-10 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Search Results
                        </h2>
                        <p className="text-lg">{searchDisplay.llmAnswer}</p>
                        <div className={'w-full overflow-auto'}>
                            <table className={'mt-4 '}>
                                <thead className={'bg-gray-200'}>
                                    <tr>
                                        {Object.keys(results[0]).map(
                                            (key, index) => (
                                                <th
                                                    key={index}
                                                    className={
                                                        'text-left border border-gray-400 p-2'
                                                    }
                                                >
                                                    {headerDict[
                                                        key as keyof typeof headerDict
                                                    ]
                                                        ? headerDict[
                                                              key as keyof typeof headerDict
                                                          ]
                                                        : key}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result, index) => (
                                        <tr key={index}>
                                            {Object.keys(result).map(
                                                (key, index) => (
                                                    <td
                                                        key={index}
                                                        className={
                                                            'border border-gray-400 p-2'
                                                        }
                                                    >
                                                        {key === 'playerID' ? (
                                                            <a
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    handleItemClick(
                                                                        e,
                                                                        index,
                                                                        String(
                                                                            result[
                                                                                key
                                                                            ]
                                                                        )
                                                                    )
                                                                }}
                                                                className={
                                                                    'cursor-pointer text-blue-500'
                                                                }
                                                            >
                                                                <PlayerName
                                                                    playerID={
                                                                        result[
                                                                            key
                                                                        ]
                                                                    }
                                                                />
                                                            </a>
                                                        ) : key === 'teamID' ? (
                                                            <a
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setActiveCard(
                                                                        [
                                                                            'team',
                                                                            String(
                                                                                result[
                                                                                    key
                                                                                ]
                                                                            ),
                                                                        ]
                                                                    )
                                                                    setClickPosition(
                                                                        {
                                                                            x: e.clientX,
                                                                            y: e.clientY,
                                                                        }
                                                                    )
                                                                }}
                                                                className={
                                                                    'cursor-pointer text-blue-500'
                                                                }
                                                            >
                                                                <TeamName
                                                                    teamID={
                                                                        result[
                                                                            key
                                                                        ]
                                                                    }
                                                                />
                                                            </a>
                                                        ) : (
                                                            result[key]
                                                        )}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {activeCard ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: clickPosition.y - 150,
                                    left: clickPosition.x - 150,
                                }}
                                className={
                                    'bg-white border border-gray-400 rounded-lg shadow-lg p-4'
                                }
                            >
                                {activeCard[0] === 'player' ? (
                                    <PlayerCard playerID={activeCard[1]} />
                                ) : null}
                                {activeCard[0] === 'team' ? (
                                    <TeamCard teamID={activeCard[1]} />
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                )
            } else {
                return (
                    <div
                        className="
                text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform"
                    >
                        <h2>No search results found.</h2>
                    </div>
                )
            }
        } else {
            return null
        }
    }

    let queries: string[] | undefined = []
    if (searchDisplay && 'similarQueries' in searchDisplay) {
        // remove [ ] from the string and split by comma
        queries = searchDisplay.similarQueries
            .slice(1, -1)
            .split(',')
            .map((query) => query.trim())
    }

    return (
        <div
            onClick={handleClickOutside}
            className="flex flex-col gap-8 items-center sm:items-start transition-all duration-2000 ease-in-out transform"
        >
            {displaySearchResults()}
            <SampleQueries similarQueries={queries} />
        </div>
    )
}
