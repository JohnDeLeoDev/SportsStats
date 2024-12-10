'use client'
import {Team} from '../../types/team'
import {getData} from '../../helpers/getData'
import React from 'react'
import {appContext} from '../../app'
import {Player, PlayerStats} from '../../types/player'
import {style} from "@/app/style";

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
        }
        fetchRoster()
    }, [teamID, userSession, yearID])

    if (!teamData || !teamHistory) {
        return <div className={'m-auto'}>Loading...</div>
    }

    function TeamStats() {
        return (
            <div>
                {teamData ? (
                        <div>
                            <hr className={style.hr}/>
                            <h2
                                className={
                                    style.h2
                                }
                            >
                                Team Stats
                            </h2>
                            <div className={style.tableDiv}>
                                <table className={style.table}>
                                    <thead>
                                    <tr className={style.tableHeader}>
                                        <th className={style.cell}>R</th>
                                        <th className={style.cell}>R</th>
                                        <th className={style.cell}>AB</th>
                                        <th className={style.cell}>H</th>
                                        <th className={style.cell}>2B</th>
                                        <th className={style.cell}>3B</th>
                                        <th className={style.cell}>HR</th>
                                        <th className={style.cell}>BB</th>
                                        <th className={style.cell}>SO</th>
                                        <th className={style.cell}>SB</th>
                                        <th className={style.cell}>CS</th>
                                        <th className={style.cell}>ERA</th>
                                        <th className={style.cell}>CG</th>
                                        <th className={style.cell}>SHO</th>
                                        <th className={style.cell}>SV</th>
                                        <th className={style.cell}>IPouts</th>
                                        <th className={style.cell}>HA</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className={style.tableRow}>
                                        <td className={style.cell}>{teamData.R}</td>
                                        <td className={style.cell}>{teamData.AB}</td>
                                        <td className={style.cell}>{teamData.H}</td>
                                        <td className={style.cell}>{teamData['2B']}</td>
                                        <td className={style.cell}>{teamData['3B']}</td>
                                        <td className={style.cell}>{teamData.HR}</td>
                                        <td className={style.cell}>{teamData.BB}</td>
                                        <td className={style.cell}>{teamData.SO}</td>
                                        <td className={style.cell}>{teamData.SB}</td>
                                        <td className={style.cell}>{teamData.CS}</td>
                                        <td className={style.cell}>{teamData.ERA}</td>
                                        <td className={style.cell}>{teamData.CG}</td>
                                        <td className={style.cell}>{teamData.SHO}</td>
                                        <td className={style.cell}>{teamData.SV}</td>
                                        <td className={style.cell}>{teamData.IPouts}</td>
                                        <td className={style.cell}>{teamData.HA}</td>
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
                {teamRoster && teamRoster.batting ? (
                    <>
                        <h3 className={style.h2}>Batters</h3>
                        <div className={style.tableDiv}>
                            <table className={style.table}>
                                <thead>
                                <tr className={style.tableHeader}>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            Name
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            AB
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            R
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            H
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            HR
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            RBI
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            SB
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            CS
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            BB
                                        </a>
                                    </td>
                                    <td className={style.cell}>
                                        <a
                                            className={style.tableClickHeader}

                                        >
                                            SO
                                        </a>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                {teamRoster.batting.map((batter: PlayerStatsDB) => {
                                    return (
                                        <tr
                                            className={style.tableRow}
                                            key={batter.playerData.playerID}
                                        >
                                            <td className={style.cell + ' text-left'}>
                                                <a
                                                    className={'text-blue-500 text-left'}
                                                    href={`/player/${batter.playerData.playerID}`}
                                                >
                                                    {batter.playerData.nameFirst}{' '}
                                                    {batter.playerData.nameLast}
                                                </a>
                                            </td>
                                            <td className={style.cell}>{batter.AB}</td>
                                            <td className={style.cell}>{batter.R}</td>
                                            <td className={style.cell}>{batter.H}</td>
                                            <td className={style.cell}>{batter.HR}</td>
                                            <td className={style.cell}>{batter.RBI}</td>
                                            <td className={style.cell}>{batter.SB}</td>
                                            <td className={style.cell}>{batter.CS}</td>
                                            <td className={style.cell}>{batter.BB}</td>
                                            <td className={style.cell}>{batter.SO}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}
            </div>
        )
    }

    function TeamPitchers() {
        return (
            <div>
                <h3 className={style.h2}>Pitchers</h3>
                {teamRoster && teamRoster.pitching ? (
                    <div className={style.tableDiv}>
                        <table className={style.table}>
                            <thead>
                            <tr className={style.tableHeader}>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        Name
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        G
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        W
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        L
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        ERA
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        CG
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        SHO
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        SV
                                    </a>
                                </th>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        IPouts
                                    </a>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {teamRoster.pitching.map((pitcher) => {
                                return (
                                    <tr
                                        className={style.tableRow}
                                        key={pitcher.playerData.playerID}
                                    >
                                        <td className={style.cell}>
                                            <a
                                                className={'text-blue-500'}
                                                href={`/player/${pitcher.playerData.playerID}`}
                                            >
                                                {pitcher.playerData.nameFirst}{' '}
                                                {pitcher.playerData.nameLast}
                                            </a>
                                        </td>
                                        <td className={style.cell}>{pitcher.G}</td>
                                        <td className={style.cell}>{pitcher.W}</td>
                                        <td className={style.cell}>{pitcher.L}</td>
                                        <td className={style.cell}>{pitcher.ERA}</td>
                                        <td className={style.cell}>{pitcher.CG}</td>
                                        <td className={style.cell}>{pitcher.SHO}</td>
                                        <td className={style.cell}>{pitcher.SV}</td>
                                        <td className={style.cell}>{pitcher.IPouts}</td>
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

    function TeamFielders() {
        return (
            <div>
                <h3 className={style.h2}>Fielders</h3>
                {teamRoster ? (
                    <div className={style.tableDiv}>
                        <table className={style.table}>
                            <thead className={style.tableHeader}>
                            <tr className={style.tableRow}>
                                <th className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        Name
                                    </a>
                                </th>
                                <td className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        G
                                    </a>
                                </td>
                                <td className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        POS
                                    </a>
                                </td>
                                <td className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        Errors
                                    </a>
                                </td>
                                <td className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        PO
                                    </a>
                                </td>
                                <td className={style.cell}>
                                    <a
                                        className={style.tableClickHeader}

                                    >
                                        InnOuts
                                    </a>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {teamRoster?.fielding.map((fielder) => {
                                return (
                                    <tr
                                        className={style.tableRow}
                                        key={`${fielder.playerData.playerID}-${fielder.POS}`}
                                    >
                                        <td className={style.cell}>
                                            <a
                                                className={'text-blue-500'}
                                                href={`/player/${fielder.playerData.playerID}`}
                                            >
                                                {fielder.playerData.nameFirst}{' '}
                                                {fielder.playerData.nameLast}
                                            </a>
                                        </td>
                                        <td className={style.cell}>{fielder.G}</td>
                                        <td className={style.cell}>{fielder.POS}</td>
                                        <td className={style.cell}>{fielder.E}</td>
                                        <td className={style.cell}>{fielder.PO}</td>
                                        <td className={style.cell}>{fielder.InnOuts}</td>
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
                                    style.h2
                                }
                            >
                                Team History
                            </h2>
                            <div className={style.tableDiv}>
                                <table className={style.table}>
                                    <thead>
                                    <tr className={style.tableHeader}>
                                        <th className={style.cell}>Year</th>
                                        <td className={style.cell}>Name</td>
                                        <td className={style.cell}>Home Park</td>
                                        <td className={style.cell}>Wins</td>
                                        <td className={style.cell}>Losses</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teamHistory.map((team) => {
                                        return (
                                            <tr
                                                className={style.tableRow}
                                                key={team.yearID}
                                            >
                                                <td className={style.cell}>
                                                    {team.yearID}
                                                </td>
                                                <td className={style.cell}>
                                                    <a
                                                        className={
                                                            'text-blue-500'
                                                        }
                                                        href={`/team/${team.yearID}-${team.teamID}`}
                                                    >
                                                        {team.name}
                                                    </a>
                                                </td>
                                                <td className={style.cell}>
                                                    {team.park}
                                                </td>
                                                <td className={style.cell}>{team.W}</td>
                                                <td className={style.cell}>{team.L}</td>
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

    return (
        <div
            className={style.pageCard}>
            <div className={style.innerCard}>
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
                        <hr className={style.hr}/>

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
