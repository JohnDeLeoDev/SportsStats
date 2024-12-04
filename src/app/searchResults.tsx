import { appContext } from './app'
import React from 'react'
import SampleQueries from '@/app/sampleQueries'
import PlayerName from '@/app/components/PlayerName'
import PlayerCard from './components/PlayerCard'
import TeamCard from './components/TeamCard'
import TeamName from '@/app/components/TeamName'

export default function SearchResults() {
    const { searchDisplay } = React.useContext(appContext)
    const [activeCard, setActiveCard] = React.useState<
        [string, string, string] | null
    >(null)
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 })
    const [errorOccurred, setErrorOccurred] = React.useState(false)

    const headerDict = {
        playerID: 'Player',
        teamID: 'Team',
        yearID: 'Year',
        W: 'Wins',
        L: 'Losses',
        lgID: 'League',
    }

    const hiddenFields = [
        'stint',
        'G_batting',
        'G_old',
        'SH',
        'SF',
        'IBB',
        'SO',
        'GIDP',
        'HBP',
    ]

    // show PlayerCard when a player is clicked
    function handleItemClick(
        event: React.MouseEvent,
        type: string,
        id: string,
        yearID: string
    ) {
        setActiveCard([type, id, yearID])
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
    }

    function displaySearchResults() {
        if (!searchDisplay) {
            return null
        }
        console.log(searchDisplay)
        if ('errorMessage' in searchDisplay) {
            setErrorOccurred(true)
            return (
                <div
                    className="
                text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform bg-white p-4
                shadow-lg rounded-lg
                "
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

        if ('message' in searchDisplay) {
            setErrorOccurred(true)
            return (
                <div
                    className={
                        'text-2xl sm:text-2xl text-center sm:text-left font-bold transition-all duration-2000 ease-in-out transform bg-white p-4 shadow-lg rounded-lg'
                    }
                >
                    <h2 className={'text-2xl sm:text-2xl font-bold'}>
                        An error occurred while fetching the search results.
                    </h2>
                    <p>Message: {String(searchDisplay.message)}</p>
                </div>
            )
        }

        if ('dbResult' in searchDisplay) {
            const results = searchDisplay.dbResult.rows

            if (results.length > 0) {
                return (
                    <div className="relative mt-10 w-full ">
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Search Results
                        </h2>
                        <p className="text-lg">{searchDisplay.llmAnswer}</p>
                        <div className={'w-full overflow-auto'}>
                            <table className={'mt-4 '}>
                                <thead className={'bg-gray-200'}>
                                    <tr>
                                        {Object.keys(results[0]).map(
                                            (key, index) =>
                                                hiddenFields.includes(
                                                    key
                                                ) ? null : (
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
                                                (key, index) =>
                                                    hiddenFields.includes(
                                                        key
                                                    ) ? null : (
                                                        <td
                                                            key={index}
                                                            className={
                                                                'border border-gray-400 p-2'
                                                            }
                                                        >
                                                            {key ===
                                                            'playerID' ? (
                                                                <a
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        handleItemClick(
                                                                            e,
                                                                            'player',
                                                                            String(
                                                                                result[
                                                                                    key
                                                                                ]
                                                                            ),
                                                                            String(
                                                                                result[
                                                                                    'yearID'
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
                                                            ) : key ===
                                                              'teamID' ? (
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
                                                                                String(
                                                                                    result[
                                                                                        'yearID'
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
                                                                        yearID={
                                                                            result[
                                                                                'yearID'
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
                                    top: clickPosition.y - 200,
                                    left: clickPosition.x - 175,
                                }}
                                className={
                                    'bg-white border border-gray-400 rounded-lg shadow-lg p-4'
                                }
                            >
                                {activeCard[0] === 'player' ? (
                                    <PlayerCard playerID={activeCard[1]} />
                                ) : null}
                                {activeCard[0] === 'team' ? (
                                    <TeamCard
                                        teamID={activeCard[1]}
                                        yearID={activeCard[2]}
                                    />
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
            className="flex flex-col gap-8 items-center sm:items-start transition-all duration-2000 ease-in-out transform "
        >
            {displaySearchResults()}
            {!errorOccurred ? <SampleQueries similarQueries={queries} /> : null}
        </div>
    )
}
