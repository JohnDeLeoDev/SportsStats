'use client'
import {Team} from '../../types/team'
import {getData} from '../../helpers/getData'
import React from 'react'
import {appContext} from '../../app'
import {Player, PlayerStats} from '../../types/player'

type TeamRoster = {
    batting: PlayerStatsDB[]
    pitching: PlayerStatsDB[]
    fielding: PlayerStatsDB[]
}

// extend PlayerStats to include playerData
type PlayerStatsDB = PlayerStats & {
    playerData: Player
    AB: number
    R: number
    H: number
    HR: number
    RBI: number
    SB: number
    CS: number
    BB: number
    SO: number
    G: number
    W: number
    L: number
    ERA: number
    CG: number
    SHO: number
    SV: number
    IPouts: number
    HA: number
    POS: string
    E: number
    PO: number
    InnOuts: number
}

export default function TeamPage({params}: { params: { slug: string } }) {
    const {userSession} = React.useContext(appContext)
    const team: string = params.slug
    const teamID = team.split('-')[1]
    const yearID = team.split('-')[0]
    const [teamData, setTeamData] = React.useState<Team | null>(null)
    const [teamHistory, setTeamHistory] = React.useState<Team[] | null>(null)
    const [teamRoster, setTeamRoster] = React.useState<TeamRoster | null>(null)

    React.useEffect(() => {
        const fetchTeamData = async () => {
            const data = await getData(userSession, 'team', teamID, yearID)
            setTeamData(data)
        }
        fetchTeamData()
    }, [teamID, userSession, yearID])

    React.useEffect(() => {
        const fetchHistory = async () => {
            const history = await getData(
                userSession,
                'teamHistory',
                teamID,
                ''
            )
            setTeamHistory(history)
        }
        fetchHistory()
    }, [teamID, userSession])

    React.useEffect(() => {
        const fetchRoster = async () => {
            const roster = await getData(
                userSession,
                'teamRoster',
                teamID,
                yearID
            )
            setTeamRoster(roster)

            console.log(roster)
        }
        fetchRoster()
    }, [teamID, userSession, yearID])

    // sorts the table by the column clicked
    function handleHeaderClick(table: string, column: string) {
        console.log('clicked', table, column)
    }

    if (!teamData || !teamHistory) {
        return <div className={'m-auto'}>Loading...</div>
    }

    function TeamStats() {
        return (
            <div>
                {teamData ? (
                        <div>
                            <hr className={'my-4 mt-4 mb-4'}/>
                            <h2
                                className={
                                    statTitleStyle
                                }
                            >
                                Team Stats
                            </h2>
                            <div className={tableDivStyle}>
                                <table className={tableStyle}>
                                    <thead>
                                    <tr className={tableHeaderStyle}>
                                        <th className={cellStyle}>R</th>
                                        <th className={cellStyle}>R</th>
                                        <th className={cellStyle}>AB</th>
                                        <th className={cellStyle}>H</th>
                                        <th className={cellStyle}>2B</th>
                                        <th className={cellStyle}>3B</th>
                                        <th className={cellStyle}>HR</th>
                                        <th className={cellStyle}>BB</th>
                                        <th className={cellStyle}>SO</th>
                                        <th className={cellStyle}>SB</th>
                                        <th className={cellStyle}>CS</th>
                                        <th className={cellStyle}>ERA</th>
                                        <th className={cellStyle}>CG</th>
                                        <th className={cellStyle}>SHO</th>
                                        <th className={cellStyle}>SV</th>
                                        <th className={cellStyle}>IPouts</th>
                                        <th className={cellStyle}>HA</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className={tableRowStyle}>
                                        <td className={cellStyle}>{teamData.R}</td>
                                        <td className={cellStyle}>{teamData.AB}</td>
                                        <td className={cellStyle}>{teamData.H}</td>
                                        <td className={cellStyle}>{teamData['2B']}</td>
                                        <td className={cellStyle}>{teamData['3B']}</td>
                                        <td className={cellStyle}>{teamData.HR}</td>
                                        <td className={cellStyle}>{teamData.BB}</td>
                                        <td className={cellStyle}>{teamData.SO}</td>
                                        <td className={cellStyle}>{teamData.SB}</td>
                                        <td className={cellStyle}>{teamData.CS}</td>
                                        <td className={cellStyle}>{teamData.ERA}</td>
                                        <td className={cellStyle}>{teamData.CG}</td>
                                        <td className={cellStyle}>{teamData.SHO}</td>
                                        <td className={cellStyle}>{teamData.SV}</td>
                                        <td className={cellStyle}>{teamData.IPouts}</td>
                                        <td className={cellStyle}>{teamData.HA}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                    :

                    null

                }
            </div>
        )
    }

    function TeamBatters() {
        return (
            <div>
                {teamRoster ? (
                    <>
                        <h3
                            className={
                                statTitleStyle
                            }
                        >
                            Batters
                        </h3>
                        <div className={tableDivStyle}>
                            <table
                                className={tableStyle}
                            >
                                <thead>
                                <tr
                                    className={
                                        tableHeaderStyle
                                    }
                                >
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'name'
                                                )
                                            }
                                        >
                                            Name
                                        </a>
                                    </td>

                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'AB'
                                                )
                                            }
                                        >
                                            AB
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'R'
                                                )
                                            }
                                        >
                                            R
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'H'
                                                )
                                            }
                                        >
                                            H
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'HR'
                                                )
                                            }
                                        >
                                            HR
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'RBI'
                                                )
                                            }
                                        >
                                            RBI
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'SB'
                                                )
                                            }
                                        >
                                            SB
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'CS'
                                                )
                                            }
                                        >
                                            CS
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'BB'
                                                )
                                            }
                                        >
                                            BB
                                        </a>
                                    </td>
                                    <td className={cellStyle}>
                                        <a
                                            className={
                                                columnNameStyle
                                            }
                                            onClick={() =>
                                                handleHeaderClick(
                                                    'batting',
                                                    'SO'
                                                )
                                            }
                                        >
                                            SO
                                        </a>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                {teamRoster?.batting.map(
                                    (batter: PlayerStatsDB) => {
                                        return (
                                            <tr
                                                className={
                                                    tableRowStyle
                                                }
                                                key={
                                                    batter
                                                        .playerData
                                                        .playerID
                                                }
                                            >
                                                <td
                                                    className={
                                                        cellStyle + ' text-left'
                                                    }
                                                >
                                                    <a
                                                        className={
                                                            'text-blue-500 text-left'
                                                        }
                                                        href={`/player/${batter.playerData.playerID}`}
                                                    >
                                                        {
                                                            batter
                                                                .playerData
                                                                .nameFirst
                                                        }{' '}
                                                        {
                                                            batter
                                                                .playerData
                                                                .nameLast
                                                        }
                                                    </a>
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.AB}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.R}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.H}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.HR}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.RBI}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.SB}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.CS}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.BB}
                                                </td>
                                                <td
                                                    className={
                                                        cellStyle
                                                    }
                                                >
                                                    {batter.SO}
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                                </tbody>
                            </table>
                        </div>

                    </>
                ) : null}
            </div>)

    }

    function TeamPitchers() {
        return (
            <div>

                <h3
                    className={
                        statTitleStyle
                    }
                >
                    Pitchers
                </h3>
                {teamRoster ? (
                    <div className={tableDivStyle}>
                        <table className={tableStyle}>
                            <thead>
                            <tr
                                className={
                                    tableHeaderStyle
                                }
                            >
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'name'
                                            )
                                        }
                                    >
                                        Name
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'G'
                                            )
                                        }
                                    >
                                        G
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'W'
                                            )
                                        }
                                    >
                                        W
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'L'
                                            )
                                        }
                                    >
                                        L
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'ERA'
                                            )
                                        }
                                    >
                                        ERA
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'CG'
                                            )
                                        }
                                    >
                                        CG
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'SHO'
                                            )
                                        }
                                    >
                                        SHO
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'SV'
                                            )
                                        }
                                    >
                                        SV
                                    </a>
                                </th>
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'pitching',
                                                'IPouts'
                                            )
                                        }
                                    >
                                        IPouts
                                    </a>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {teamRoster?.pitching.map((pitcher) => {
                                return (
                                    <tr
                                        className={tableRowStyle}
                                        key={
                                            pitcher.playerData
                                                .playerID
                                        }
                                    >
                                        <td
                                            className={
                                                cellStyle
                                            }
                                        >
                                            <a
                                                className={
                                                    'text-blue-500'
                                                }
                                                href={`/player/${pitcher.playerData.playerID}`}
                                            >
                                                {
                                                    pitcher
                                                        .playerData
                                                        .nameFirst
                                                }{' '}
                                                {
                                                    pitcher
                                                        .playerData
                                                        .nameLast
                                                }
                                            </a>
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.G}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.W}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.L}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.ERA}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.CG}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.SHO}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.SV}
                                        </td>
                                        <td className={cellStyle}>
                                            {pitcher.IPouts}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>)


    }

    function TeamFielders() {
        return (
            <div>
                <h3
                    className={
                        statTitleStyle
                    }
                >
                    Fielders
                </h3>
                {teamRoster ? (
                    <div className={tableDivStyle}>
                        <table className={tableStyle}>
                            <thead>
                            <tr
                                className={
                                    tableHeaderStyle
                                }
                            >
                                <th className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'fielding',
                                                'name'
                                            )
                                        }
                                    >
                                        Name
                                    </a>
                                </th>

                                <td className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'fielding',
                                                'G'
                                            )
                                        }
                                    >
                                        G
                                    </a>
                                </td>
                                <td className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'fielding',
                                                'POS'
                                            )
                                        }
                                    >
                                        POS
                                    </a>
                                </td>
                                <td className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'fielding',
                                                'Errors'
                                            )
                                        }
                                    >
                                        Errors
                                    </a>
                                </td>
                                <td className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'fielding',
                                                'PO'
                                            )
                                        }
                                    >
                                        PO
                                    </a>
                                </td>
                                <td className={cellStyle}>
                                    <a
                                        className={columnNameStyle}
                                        onClick={() =>
                                            handleHeaderClick(
                                                'fielding',
                                                'InnOuts'
                                            )
                                        }
                                    >
                                        InnOuts
                                    </a>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {teamRoster?.fielding.map((fielder) => {
                                console.log(fielder)
                                return (
                                    <tr
                                        className={tableRowStyle}
                                        key={
                                            fielder.playerData
                                                .playerID
                                        }
                                    >
                                        <td
                                            className={
                                                ' text-left'
                                            }
                                        >
                                            <a
                                                className={
                                                    'text-blue-500'
                                                }
                                                href={`/player/${fielder.playerData.playerID}`}
                                            >
                                                {
                                                    fielder
                                                        .playerData
                                                        .nameFirst
                                                }{' '}
                                                {
                                                    fielder
                                                        .playerData
                                                        .nameLast
                                                }
                                            </a>
                                        </td>
                                        <td className={cellStyle}>
                                            {fielder.G}
                                        </td>
                                        <td className={cellStyle}>
                                            {fielder.POS}
                                        </td>
                                        <td className={cellStyle}>
                                            {fielder.E}
                                        </td>
                                        <td className={cellStyle}>
                                            {fielder.PO}
                                        </td>
                                        <td className={cellStyle}>
                                            {fielder.InnOuts}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        )
    }

    function TeamHistory() {
        return (
            <div>
                {teamHistory ? (
                        <div>
                            <h2
                                className={
                                    statTitleStyle
                                }
                            >
                                Team History
                            </h2>
                            <div className={tableDivStyle}>
                                <table className={tableStyle}>
                                    <thead>
                                    <tr className={tableHeaderStyle}>
                                        <th className={cellStyle}>Year</th>
                                        <td className={cellStyle}>Name</td>
                                        <td className={cellStyle}>Home Park</td>
                                        <td className={cellStyle}>Wins</td>
                                        <td className={cellStyle}>Losses</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teamHistory.map((team) => {
                                        return (
                                            <tr
                                                className={tableRowStyle}
                                                key={team.yearID}
                                            >
                                                <td className={cellStyle}>
                                                    {team.yearID}
                                                </td>
                                                <td className={cellStyle}>
                                                    <a
                                                        className={
                                                            'text-blue-500'
                                                        }
                                                        href={`/team/${team.yearID}-${team.teamID}`}
                                                    >
                                                        {team.name}
                                                    </a>
                                                </td>
                                                <td className={cellStyle}>
                                                    {team.park}
                                                </td>
                                                <td className={cellStyle}>{team.W}</td>
                                                <td className={cellStyle}>{team.L}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    ) :
                    null
                }

            </div>
        )
    }

    const columnNameStyle = 'hover:text-blue-500 cursor-pointer font-bold text-left'
    const cellStyle = 'border-collapse p-4 text-left '
    const tableStyle = 'border-collapse text-left w-full '
    const tableRowStyle = ''

    const tableHeaderStyle =
        'border-collapse p-4 text-left '
    const tableDivStyle = 'overflow-x-auto w-full shadow-lg rounded-lg p-4'
    const statTitleStyle = 'text-xl font-bold mb-4'

    return (
        <div
            className={'m-auto mt-40 mb-40 max-w-2xl justify-center flex flex-col  bg-white drop-shadow rounded-lg p-8 pl-12 pr-12'}>
            <div>
                <div className="">
                    <h1
                        className={
                            'text-4xl sm:text-xl text-center sm:text-left font-bold mb-4'
                        }
                    >
                        {teamData.name} ({teamData.yearID})
                    </h1>
                </div>
                <div className={'mt-2 mb-2'}>
                    <p>League: {teamData.lgID}</p>
                    <p>Division: {teamData.divID}</p>
                </div>
                <div className={'mt-2 mb-2'}>
                    <p>Games: {teamData.G}</p>
                    <p>Wins: {teamData.W}</p>
                    <p>Losses: {teamData.L}</p>
                    <p>
                        Win %:{' '}
                        {(Number(teamData.W) / Number(teamData.G)).toFixed(3)}
                    </p>
                </div>

                <TeamStats/>

                {teamRoster ? (
                    <>
                        <hr className={'my-4 mt-4 mb-4'}/>

                        <TeamBatters/>
                        <hr className={'my-4 mt-4 mb-4'}/>

                        <TeamPitchers/>
                        <hr className={'my-4 mt-4 mb-4'}/>

                        <TeamFielders/>
                    </>
                ) : (
                    <>
                        <hr className={'my-4 mt-4 mb-4'}/>
                        <h2 className={'text-center text-lg font-bold mt-4'}>
                            Loading team roster...
                        </h2>
                    </>
                )}
                <hr className={'my-4 mt-4 mb-4'}/>

                <TeamHistory/>

            </div>
        </div>
    )
}
