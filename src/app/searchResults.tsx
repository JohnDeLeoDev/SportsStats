import {appContext} from './app'
import React from 'react'
import SampleQueries from '@/app/sampleQueries'
import PlayerName from '@/app/components/PlayerName'
import TeamName from '@/app/components/TeamName'
import SearchHistory from '@/app/searchHistory'
import {style} from "@/app/style";
import {CognitoUserSession} from "amazon-cognito-identity-js";

export default function SearchResults() {
    const {searchDisplay, userSession, searchType} = React.useContext(appContext) as {
        searchDisplay: {
            message?: string;
            errorMessage?: string;
            dbResult?: { rows: never[] };
            similarQueries?: string[],
            llmAnswer?: string;
        } | null;
        userSession: CognitoUserSession | null;
        searchType: string;
    };
    const [errorOccurred, setErrorOccurred] = React.useState(false)

    React.useEffect(() => {
        if (searchDisplay && (searchDisplay.errorMessage || searchDisplay.message)) {
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
                    data-testid={'error-message'}
                    className={style.statSectionDiv}>
                    <h2>An error occurred while fetching the search results.</h2>
                    <p className={style.p}>Message: {String(searchDisplay.errorMessage)}</p>
                </div>
            )
        }

        if (searchDisplay && 'message' in searchDisplay) {
            return (
                <div
                    className={style.statSectionDiv}>
                    <h2 className={style.h2}>An error occurred while fetching the search
                        results.</h2>
                    <p className={style.p}>Message: {String(searchDisplay.message)}</p>
                </div>
            )
        }

        if (searchDisplay && 'dbResult' in searchDisplay && searchDisplay.dbResult) {
            const results = searchDisplay.dbResult?.rows || []

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
                                {results.map((result: Record<string, unknown>, index) => (
                                    <tr key={index}>
                                        {Object.keys(result).map((key, index) =>
                                            hiddenFields.includes(key) ? null : (
                                                <td key={index} className={style.cell}>
                                                    {key === 'playerID' ? (
                                                        <a href={`/player/${result[key] as string}`}
                                                           className={style.a}>
                                                            <PlayerName playerID={result[key] as string}/>
                                                        </a>
                                                    ) : key === 'teamID' ? (
                                                        <a className={style.a}
                                                           href={`/team/${result['yearID'] as string}-${result[key] as string}`}>
                                                            <TeamName teamID={result[key] as string}
                                                                      yearID={result['yearID'] as string}/>
                                                        </a>
                                                    ) : (
                                                        String(result[key])
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

    let queries: string[] = []
    if (searchDisplay?.similarQueries) {
        queries = Array.isArray(searchDisplay.similarQueries) ? searchDisplay.similarQueries : String(searchDisplay.similarQueries).split(',');
    }

    return (
        <div
            data-testid={'searchResults'}
            className={''}>
            {displaySearchResults()}
            {!errorOccurred && queries.length > 0 && searchType === 'general' ?
                <SampleQueries similarQueries={queries}/> : null}
            {!errorOccurred && userSession ? <SearchHistory/> : null}
        </div>
    )
}