'use client'
import {
    BattingStats,
    FieldingStats,
    PitchingStats,
    Player,
    PlayerStats,
} from '../../types/player'
import { getData } from '../../helpers/getData'
import React from 'react'
import { appContext } from '../../app'

export default function PlayerPage({ params }: { params: { slug: string } }) {
    const { userSession } = React.useContext(appContext)
    const playerID: string = params.slug
    const [playerData, setPlayerData] = React.useState<Player | null>(null)
    const [playerStats, setPlayerStats] = React.useState<PlayerStats | null>(
        null
    )

    React.useEffect(() => {
        getData(userSession, 'player', playerID, '').then((data) => {
            setPlayerData(data)
        })
    }, [playerID, userSession])

    React.useEffect(() => {
        getData(userSession, 'playerStats', playerID, '').then((data) => {
            const batting = JSON.parse(data.batting)
            const pitching = JSON.parse(data.pitching)
            const fielding = JSON.parse(data.fielding)
            setPlayerStats({ batting, pitching, fielding })
        })
    }, [playerID, userSession])

    const cellStyle = 'border border-black border-collapse p-2 text-center '
    const tableStyle = 'border-collapse border border-black text-center'
    const tableRowStyle = 'border border-black border-collapse p-2 text-center'
    const tableHeaderColStyle =
        'border border-black border-collapse p-2 text-center bg-gray-200'
    const tableHeaderStyle =
        'border border-black border-collapse p-2 text-center bg-gray-200'
    const tableDivStyle = 'overflow-x-auto max-w-full  m-4'
    const sectionDivStyle = ''
    const statTitleStyle = 'text-xl font-bold'

    if (!playerData || !playerStats) {
        return <div>Loading...</div>
    }

    console.log(playerStats)

    // pitching stats
    // playerID	yearID	stint	teamID	lgID	W	L	G	GS	CG	SHO	SV	IPouts	H	ER	HR	BB	SO	BAOpp	ERA	IBB	WP	HBP	BK	BFP	GF	R	SH	SF	GIDP

    return (
        <div
            className={
                'm-10 flex flex-col overflow-hidden bg-white drop-shadow rounded-lg p-8 pl-12 pr-12'
            }
        >
            <div className={''}>
                <h1 className={'text-2xl font-bold text-center'}>
                    Player Profile
                </h1>
                <div className="">
                    <a href={`/player/${playerID}`}>
                        <h1
                            className={
                                'text-4xl sm:text-xl text-center sm:text-left font-bold mb-4 text-blue-500'
                            }
                        >
                            {playerData.nameFirst} {playerData.nameLast}
                        </h1>
                    </a>
                </div>
                <div>
                    <p>
                        Born: {playerData.birthMonth}/{playerData.birthDay}/
                        {playerData.birthYear}
                    </p>

                    {playerData.deathYear ? (
                        <p>
                            Died: {playerData.deathMonth}/{playerData.deathDay}/
                            {playerData.deathYear}
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>

                <p>
                    Place of Birth: {playerData.birthCity},{' '}
                    {playerData.birthState}, {playerData.birthCountry}
                </p>
                <div>
                    <p>Weight: {playerData.weight} lbs</p>
                    <p>
                        Height: {(Number(playerData.height) / 12).toFixed(0)}{' '}
                        feet, {Number(playerData.height) % 12} inches
                    </p>
                </div>
                <div>
                    <p>Throws: {playerData.throws}</p>
                    <p>Bats: {playerData.bats}</p>
                </div>
                <div>
                    <p>Debut: {playerData.debut}</p>
                    <p>Final Game: {playerData.finalGame}</p>
                </div>
            </div>
            <hr className={'my-8'} />
            <div className={''}>
                <h2 className={'text-xl mt-4 mb-4 font-bold text-center'}>
                    Career Statistics
                </h2>
                {playerStats?.batting ? (
                    <div className={sectionDivStyle}>
                        <hr className={'w-9/12 m-auto mt-8 mb-8'} />
                        <h2 className={statTitleStyle}>Batting</h2>
                        <div className={tableDivStyle}>
                            <table className={tableStyle}>
                                <thead className={tableHeaderStyle}>
                                    <tr className={tableRowStyle}>
                                        <th className={tableHeaderColStyle}>
                                            Year
                                        </th>
                                        <th className={cellStyle}>G</th>
                                        <th className={cellStyle}>AB</th>
                                        <th className={cellStyle}>R</th>
                                        <th className={cellStyle}>H</th>
                                        <th className={cellStyle}>2B</th>
                                        <th className={cellStyle}>3B</th>
                                        <th className={cellStyle}>HR</th>
                                        <th className={cellStyle}>RBI</th>
                                        <th className={cellStyle}>SB</th>
                                        <th className={cellStyle}>CS</th>
                                        <th className={cellStyle}>BB</th>
                                        <th className={cellStyle}>SO</th>
                                        <th className={cellStyle}>IBB</th>
                                        <th className={cellStyle}>HBP</th>
                                        <th className={cellStyle}>SH</th>
                                        <th className={cellStyle}>SF</th>
                                        <th className={cellStyle}>GIDP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playerStats?.batting?.map(
                                        (stat: BattingStats) => (
                                            <tr
                                                className={tableRowStyle}
                                                key={stat.yearID}
                                            >
                                                <td
                                                    className={
                                                        tableHeaderColStyle
                                                    }
                                                >
                                                    {stat.yearID}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.G}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.AB}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.R}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.H}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat['2B']}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat['3B']}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.HR}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.RBI}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SB}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.CS}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.BB}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SO}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.IBB}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.HBP}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SH}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SF}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.GIDP}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
                {playerStats?.pitching ? (
                    <div className={sectionDivStyle}>
                        <hr className={'w-9/12 m-auto mt-8 mb-8'} />
                        <h2 className={statTitleStyle}>Pitching</h2>
                        <div className={tableDivStyle}>
                            <table className={tableStyle}>
                                <thead className={tableHeaderStyle}>
                                    {
                                        // playerID	yearID	stint	teamID	lgID	W	L	G	GS	CG	SHO	SV	IPouts	H	ER	HR	BB	SO	BAOpp	ERA	IBB	WP	HBP	BK	BFP	GF	R	SH	SF	GIDP}
                                    }
                                    <tr className={tableRowStyle}>
                                        <th className={tableHeaderColStyle}>
                                            Year
                                        </th>
                                        <th className={cellStyle}>W</th>
                                        <th className={cellStyle}>L</th>
                                        <th className={cellStyle}>G</th>
                                        <th className={cellStyle}>GS</th>
                                        <th className={cellStyle}>CG</th>
                                        <th className={cellStyle}>SHO</th>
                                        <th className={cellStyle}>SV</th>
                                        <th className={cellStyle}>IP</th>
                                        <th className={cellStyle}>H</th>
                                        <th className={cellStyle}>ER</th>
                                        <th className={cellStyle}>HR</th>
                                        <th className={cellStyle}>BB</th>
                                        <th className={cellStyle}>SO</th>
                                        <th className={cellStyle}>BAOpp</th>
                                        <th className={cellStyle}>ERA</th>
                                        <th className={cellStyle}>IBB</th>
                                        <th className={cellStyle}>WP</th>
                                        <th className={cellStyle}>HBP</th>
                                        <th className={cellStyle}>BK</th>
                                        <th className={cellStyle}>BFP</th>
                                        <th className={cellStyle}>GF</th>
                                        <th className={cellStyle}>R</th>
                                        <th className={cellStyle}>SH</th>
                                        <th className={cellStyle}>SF</th>
                                        <th className={cellStyle}>GIDP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playerStats?.pitching?.map(
                                        (stat: PitchingStats) => (
                                            <tr
                                                className={tableRowStyle}
                                                key={stat.yearID}
                                            >
                                                <td
                                                    className={
                                                        tableHeaderColStyle
                                                    }
                                                >
                                                    {stat.yearID}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.W}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.L}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.G}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.GS}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.CG}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SHO}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SV}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.IPouts}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.H}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.ER}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.HR}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.BB}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SO}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.BAOpp}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.ERA}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.IBB}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.WP}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.HBP}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.BK}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.BFP}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.GF}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.R}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SH}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.SF}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.GIDP}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {playerStats?.fielding ? (
                    <div className={sectionDivStyle}>
                        <hr className={'w-9/12 m-auto mt-8 mb-8'} />
                        <h2 className={statTitleStyle}>Fielding</h2>
                        <div className={tableDivStyle}>
                            <table className={tableStyle}>
                                <thead className={tableHeaderStyle}>
                                    <tr className={tableRowStyle}>
                                        <th className={tableHeaderColStyle}>
                                            Year
                                        </th>
                                        <th className={cellStyle}>POS</th>
                                        <th className={cellStyle}>G</th>
                                        <th className={cellStyle}>GS</th>
                                        <th className={cellStyle}>InnOuts</th>
                                        <th className={cellStyle}>PO</th>
                                        <th className={cellStyle}>A</th>
                                        <th className={cellStyle}>E</th>
                                        <th className={cellStyle}>DP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playerStats?.fielding?.map(
                                        (stat: FieldingStats) => (
                                            <tr
                                                className={tableRowStyle}
                                                key={stat.yearID}
                                            >
                                                <td
                                                    className={
                                                        tableHeaderColStyle
                                                    }
                                                >
                                                    {stat.yearID}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.POS}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.G}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.GS}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.InnOuts}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.PO}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.A}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.E}
                                                </td>
                                                <td className={cellStyle}>
                                                    {stat.DP}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
