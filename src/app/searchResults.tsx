import {appContext} from './app'
import React from 'react'
import SampleQueries from '@/app/sampleQueries'
import PlayerName from '@/app/components/PlayerName'
import TeamName from '@/app/components/TeamName'
import SearchHistory from '@/app/searchHistory'
import {style} from "@/app/style";

export default function SearchResults() {
    const {searchDisplay, userSession, searchType} = React.useContext(appContext)
    const [errorOccurred, setErrorOccurred] = React.useState(false)

    React.useEffect(() => {
        if (searchDisplay && ('errorMessage' in searchDisplay || 'message' in searchDisplay)) {
            setErrorOccurred(true)
        }
    }, [searchDisplay])

    const headerDict = {
        playerID: 'Player',
        teamID: 'Team',
        yearID: 'Year',
        W: 'Wins',
        L: 'Losses',
        lgID: 'League',
        birthYear: 'Birth Year',
        birthMonth: 'Birth Month',
        birthDay: 'Birth Day',
        birthCountry: 'Birth Country',
        birthState: 'Birth State',
        birthCity: 'Birth City',
        deathYear: 'Death Year',
        deathMonth: 'Death Month',
        deathDay: 'Death Day',
        deathCountry: 'Death Country',
        deathState: 'Death State',
        deathCity: 'Death City',
        nameFirst: 'First Name',
        nameLast: 'Last Name',
        nameGiven: 'Given Name',
        weight: 'Weight',
        height: 'Height',
        bats: 'Bats',
        throws: 'Throws',
        debut: 'Debut',
        finalGame: 'Final Game',
        divID: 'Division',

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
        'ID',
        'bbrefID',
        'retroID',


    ]

    function displaySearchResults() {
        if (!searchDisplay) {
            return null
        }
        if ('errorMessage' in searchDisplay) {
            return (
                <div
                    className={style.statSectionDiv}>
                    <h2>An error occurred while fetching the search results.</h2>
                    <p className={style.p}>Message: {String(searchDisplay.errorMessage)}</p>
                </div>
            )
        }

        if ('message' in searchDisplay) {
            return (
                <div
                    className={style.statSectionDiv}>
                    <h2 className={style.h2}>An error occurred while fetching the search
                        results.</h2>
                    <p className={style.p}>Message: {String(searchDisplay.message)}</p>
                </div>
            )
        }

        if ('dbResult' in searchDisplay) {
            const results = searchDisplay.dbResult.rows

            if (results.length > 0) {
                return (
                    <div className={style.statSectionDiv}>
                        <h2 className={style.h2}>Search Results</h2>
                        <p className={style.smallP}>{searchDisplay.llmAnswer}</p>
                        <div className={style.tableDiv}>
                            <table className={style.table}>
                                <thead className={style.tableHeader}>
                                <tr>
                                    {Object.keys(results[0]).map((key, index) =>
                                        hiddenFields.includes(key) ? null : (
                                            <th key={index} className={style.cell}>
                                                {headerDict[key as keyof typeof headerDict] ? headerDict[key as keyof typeof headerDict] : key}
                                            </th>
                                        )
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {results.map((result, index) => (
                                    <tr key={index}>
                                        {Object.keys(result).map((key, index) =>
                                            hiddenFields.includes(key) ? null : (
                                                <td key={index} className={style.cell}>
                                                    {key === 'playerID' ? (
                                                        <a href={`/player/${result[key]}`}
                                                           className={style.a}>
                                                            <PlayerName playerID={result[key]}/>
                                                        </a>
                                                    ) : key === 'teamID' ? (
                                                        <a className={style.a}
                                                           href={`/team/${result['yearID']}-${result[key]}`}>
                                                            <TeamName teamID={result[key]} yearID={result['yearID']}/>
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
                    </div>
                )
            } else {
                return (
                    <div
                        className={style.statSectionDiv}>
                        <h2 className={style.h2}>No search results found.</h2>
                        <p className={style.smallP}>Please try a different search query.</p>
                    </div>
                )
            }
        } else {
            return null
        }
    }

    let queries: string[] | undefined = []
    if (searchDisplay && 'similarQueries' in searchDisplay && searchDisplay.similarQueries.length > 0) {
        queries = searchDisplay.similarQueries.slice(1, -1).split(',').map((query) => query.trim())
    }

    return (
        <div
            className={''}>
            {displaySearchResults()}
            {!errorOccurred && queries.length > 0 && searchType === 'general' ?
                <SampleQueries similarQueries={queries}/> : null}
            {!errorOccurred && userSession ? <SearchHistory/> : null}
        </div>
    )
}