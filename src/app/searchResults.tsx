import {appContext} from './app'
import React from 'react'
import SampleQueries from '@/app/sampleQueries'
import PlayerName from '@/app/components/PlayerName'
import PlayerCard from './components/PlayerCard'
import TeamCard from './components/TeamCard'
import TeamName from '@/app/components/TeamName'
import SearchHistory from '@/app/searchHistory'

export default function SearchResults() {
    const {searchDisplay, userSession} = React.useContext(appContext)
    const [activeCard, setActiveCard] = React.useState<
        [string, string, string] | null
    >(null)
    const [mousePosition, setMousePosition] = React.useState({x: 0, y: 0})
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
    function handleItemHover(
        event: React.MouseEvent,
        type: string,
        id: string,
        yearID: string
    ) {
        if (
            activeCard &&
            activeCard.every((val, index) => val === [type, id, yearID][index])
        ) {
            return
        }
        setActiveCard([type, id, yearID])

        console.log(event)
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        })
        console.log(mousePosition)
    }

    function handleMouseOutside() {
        if (activeCard === null) {
            return
        }

        setActiveCard(null)
        setMousePosition({x: 0, y: 0})
    }

    function displaySearchResults() {
        if (!searchDisplay) {
            return null
        }
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
                    <div className="mt-10 w-full ">
                        <h2 className="text-2xl  font-bold mb-4">
                            Search Results
                        </h2>
                        <p className="text-lg mb-4">
                            {searchDisplay.llmAnswer}
                        </p>
                        <div className={'w-full overflow-auto shadow mt-4'}>
                            <table className={' shadow'}>
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
                                                                href={`/player/${result[key]}`}
                                                                onMouseOver={(
                                                                    e
                                                                ) => {
                                                                    handleItemHover(
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
                                                                className={
                                                                    'cursor-pointer text-blue-500'
                                                                }
                                                                href={`/team/${result['yearID']}-${result[key]}`}
                                                                onMouseOver={(
                                                                    e
                                                                ) => {
                                                                    handleItemHover(
                                                                        e,
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
                                                                        )
                                                                    )
                                                                }
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
                                className={
                                    `bg-white border border-gray-400 rounded-lg shadow-lg p-4 absolute  z-10`
                                }
                                style={{
                                    top: `${mousePosition.y - 200}px`,
                                    left: `${mousePosition.x - 250}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}

                            >
                                {activeCard[0] === 'player' ? (
                                    <PlayerCard playerID={activeCard[1]}/>
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
            className="flex flex-col gap-8 items-center sm:items-start transition-all duration-2000 ease-in-out transform"
            onClick={handleMouseOutside}
        >
            {displaySearchResults()}
            {!errorOccurred ? <SampleQueries similarQueries={queries}/> : null}
            {!errorOccurred && userSession ? <SearchHistory/> : null}
        </div>
    )
}
