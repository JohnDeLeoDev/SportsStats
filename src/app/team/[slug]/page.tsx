'use client'
import { Team } from '../../types/team'
import { getData } from '../../helpers/getData'
import React from 'react'
import { appContext } from '../../app'
import { Player, PlayerStats } from '../../types/player'

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

export default function TeamPage({ params }: { params: { slug: string } }) {
    const { userSession } = React.useContext(appContext)
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
    }, [teamID, userSession])

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

    const columnNameStyle = 'hover:text-blue-500 cursor-pointer'

    return (
        <div className={'m-auto w-10/12 shadow bg-white rounded-lg p-12 '}>
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
                <hr className={'my-4 mt-4 mb-4'} />

                <div>
                    <h2
                        className={
                            'text-4xl sm:text-xl text-center sm:text-left font-bold mt-4 mb-4'
                        }
                    >
                        Team Stats
                    </h2>
                    <table className={'table-auto border w-full'}>
                        <thead>
                            <tr className={'p-10 border font-bold text-center'}>
                                <th className={'border'}>R</th>
                                <td className={'border'}>AB</td>
                                <td className={'border'}>H</td>
                                <td className={'border'}>2B</td>
                                <td className={'border'}>3B</td>
                                <td className={'border'}>HR</td>
                                <td className={'border'}>BB</td>
                                <td className={'border'}>SO</td>
                                <td className={'border'}>SB</td>
                                <td className={'border'}>CS</td>
                                <td className={'border'}>ERA</td>
                                <td className={'border'}>CG</td>
                                <td className={'border'}>SHO</td>
                                <td className={'border'}>SV</td>
                                <td className={'border'}>IPouts</td>
                                <td className={'border'}>HA</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={'text-center'}>
                                <td className={'border'}>{teamData.R}</td>
                                <td className={'border'}>{teamData.AB}</td>
                                <td className={'border'}>{teamData.H}</td>
                                <td className={'border'}>{teamData['2B']}</td>
                                <td className={'border'}>{teamData['3B']}</td>
                                <td className={'border'}>{teamData.HR}</td>
                                <td className={'border'}>{teamData.BB}</td>
                                <td className={'border'}>{teamData.SO}</td>
                                <td className={'border'}>{teamData.SB}</td>
                                <td className={'border'}>{teamData.CS}</td>
                                <td className={'border'}>{teamData.ERA}</td>
                                <td className={'border'}>{teamData.CG}</td>
                                <td className={'border'}>{teamData.SHO}</td>
                                <td className={'border'}>{teamData.SV}</td>
                                <td className={'border'}>{teamData.IPouts}</td>
                                <td className={'border'}>{teamData.HA}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {teamRoster ? (
                    <>
                        <hr className={'my-4 mt-4 mb-4'} />
                        <div>
                            {teamRoster ? (
                                <>
                                    <h3
                                        className={
                                            'text-4xl sm:text-xl text-center sm:text-left font-bold mt-4 mb-4'
                                        }
                                    >
                                        Batters
                                    </h3>
                                    <table
                                        className={'table-auto border w-full'}
                                    >
                                        <thead>
                                            <tr
                                                className={
                                                    'p-10 border font-bold text-center'
                                                }
                                            >
                                                <th className={'border'}>
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
                                                </th>

                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                <td className={'border'}>
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
                                                                'text-center'
                                                            }
                                                            key={
                                                                batter
                                                                    .playerData
                                                                    .playerID
                                                            }
                                                        >
                                                            <td
                                                                className={
                                                                    'border text-left'
                                                                }
                                                            >
                                                                <a
                                                                    className={
                                                                        'text-blue-500'
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
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.AB}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.R}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.H}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.HR}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.RBI}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.SB}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.CS}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
                                                                }
                                                            >
                                                                {batter.BB}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'border'
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
                                </>
                            ) : null}
                        </div>
                        <hr className={'my-4 mt-4 mb-4'} />
                        <div>
                            <h3
                                className={
                                    'text-4xl sm:text-xl text-center sm:text-left font-bold mt-4 mb-4'
                                }
                            >
                                Pitchers
                            </h3>
                            {teamRoster ? (
                                <table className={'table-auto border w-full'}>
                                    <thead>
                                        <tr
                                            className={
                                                'p-10 border font-bold text-center'
                                            }
                                        >
                                            <th className={'border'}>
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
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                            <td className={'border'}>
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
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamRoster?.pitching.map((pitcher) => {
                                            return (
                                                <tr
                                                    className={'text-center'}
                                                    key={
                                                        pitcher.playerData
                                                            .playerID
                                                    }
                                                >
                                                    <td
                                                        className={
                                                            'border text-left'
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
                                                    <td className={'border'}>
                                                        {pitcher.G}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.W}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.L}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.ERA}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.CG}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.SHO}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.SV}
                                                    </td>
                                                    <td className={'border'}>
                                                        {pitcher.IPouts}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                        <hr className={'my-4 mt-4 mb-4'} />
                        <div>
                            <h3
                                className={
                                    'text-4xl sm:text-xl text-center sm:text-left font-bold mt-4 mb-4'
                                }
                            >
                                Fielders
                            </h3>
                            {teamRoster ? (
                                <table className={'table-auto border w-full'}>
                                    <thead>
                                        <tr
                                            className={
                                                'p-10 border font-bold text-center'
                                            }
                                        >
                                            <th className={'border'}>
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

                                            <td className={'border'}>
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
                                            <td className={'border'}>
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
                                            <td className={'border'}>
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
                                            <td className={'border'}>
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
                                            <td className={'border'}>
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
                                                    className={'text-center'}
                                                    key={
                                                        fielder.playerData
                                                            .playerID
                                                    }
                                                >
                                                    <td
                                                        className={
                                                            'border text-left'
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
                                                    <td className={'border'}>
                                                        {fielder.G}
                                                    </td>
                                                    <td className={'border'}>
                                                        {fielder.POS}
                                                    </td>
                                                    <td className={'border'}>
                                                        {fielder.E}
                                                    </td>
                                                    <td className={'border'}>
                                                        {fielder.PO}
                                                    </td>
                                                    <td className={'border'}>
                                                        {fielder.InnOuts}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                    </>
                ) : (
                    <>
                        <hr className={'my-4 mt-4 mb-4'} />
                        <h2 className={'text-center text-lg font-bold mt-4'}>
                            Loading team roster...
                        </h2>
                    </>
                )}
                <hr className={'my-4 mt-4 mb-4'} />
                <div>
                    <h2
                        className={
                            'text-4xl sm:text-xl text-center sm:text-left font-bold mt-4 mb-4'
                        }
                    >
                        Team History
                    </h2>
                    <table className={'table-auto border w-full'}>
                        <thead>
                            <tr className={'p-10 border font-bold text-center'}>
                                <th className={'border'}>Year</th>
                                <td className={'border'}>Name</td>
                                <td className={'border'}>Home Park</td>
                                <td className={'border'}>Wins</td>
                                <td className={'border'}>Losses</td>
                            </tr>
                        </thead>
                        <tbody>
                            {teamHistory.map((team) => {
                                return (
                                    <tr
                                        className={'text-center'}
                                        key={team.yearID}
                                    >
                                        <td className={'border'}>
                                            {team.yearID}
                                        </td>
                                        <td className={'border text-left'}>
                                            <a
                                                className={
                                                    'text-blue-500 text-left'
                                                }
                                                href={`/team/${team.yearID}-${team.teamID}`}
                                            >
                                                {team.name}
                                            </a>
                                        </td>
                                        <td className={'border text-left'}>
                                            {team.park}
                                        </td>
                                        <td className={'border'}>{team.W}</td>
                                        <td className={'border'}>{team.L}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
