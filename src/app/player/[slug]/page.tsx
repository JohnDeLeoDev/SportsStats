'use client'
import {BattingStats, FieldingStats, PitchingStats, Player, PlayerStats,} from '../../types/player'
import {getData} from '../../helpers/getData'
import React from 'react'
import {appContext} from '../../app'
import {style} from "@/app/style";

export default function PlayerPage({params}: { params: { slug: string } }) {
    const {userSession} = React.useContext(appContext)
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
            setPlayerStats({batting, pitching, fielding})
        })
    }, [playerID, userSession])


    if (!playerData || !playerStats) {
        return <div>Loading...</div>
    }

    function BattingStatsTable() {
        return (
            <div className={style.statSectionDiv}>
                <hr className={style.hr}/>
                <h2 className={style.h2}>Batting</h2>
                <div className={style.tableDiv}>
                    <table className={style.table}>
                        <thead className={style.tableHeader}>
                        <tr className={style.tableRow}>
                            <th className={style.cell}>
                                Year
                            </th>
                            <th className={style.cell}>G</th>
                            <th className={style.cell}>AB</th>
                            <th className={style.cell}>R</th>
                            <th className={style.cell}>H</th>
                            <th className={style.cell}>2B</th>
                            <th className={style.cell}>3B</th>
                            <th className={style.cell}>HR</th>
                            <th className={style.cell}>RBI</th>
                            <th className={style.cell}>SB</th>
                            <th className={style.cell}>CS</th>
                            <th className={style.cell}>BB</th>
                            <th className={style.cell}>SO</th>
                            <th className={style.cell}>IBB</th>
                            <th className={style.cell}>HBP</th>
                            <th className={style.cell}>SH</th>
                            <th className={style.cell}>SF</th>
                            <th className={style.cell}>GIDP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playerStats?.batting?.map(
                            (stat: BattingStats) => (
                                <tr
                                    className={style.tableRow}
                                    key={stat.yearID}
                                >
                                    <td
                                        className={
                                            style.cell
                                        }
                                    >
                                        {stat.yearID}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.G}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.AB}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.R}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.H}
                                    </td>
                                    <td className={style.cell}>
                                        {stat['2B']}
                                    </td>
                                    <td className={style.cell}>
                                        {stat['3B']}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.HR}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.RBI}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.SB}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.CS}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.BB}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.SO}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.IBB}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.HBP}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.SH}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.SF}
                                    </td>
                                    <td className={style.cell}>
                                        {stat.GIDP}
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    function PitchingStatsTable() {
        return (<div className={style.statSectionDiv}>
            <hr className={style.hr}/>
            <h2 className={style.h2}>Pitching</h2>
            <div className={style.tableDiv}>
                <table className={style.table}>
                    <thead className={style.tableHeader}>
                    {
                        // playerID	yearID	stint	teamID	lgID	W	L	G	GS	CG	SHO	SV	IPouts	H	ER	HR	BB	SO	BAOpp	ERA	IBB	WP	HBP	BK	BFP	GF	R	SH	SF	GIDP}
                    }
                    <tr className={style.tableRow}>
                        <th className={style.cell}>
                            Year
                        </th>
                        <th className={style.cell}>W</th>
                        <th className={style.cell}>L</th>
                        <th className={style.cell}>G</th>
                        <th className={style.cell}>GS</th>
                        <th className={style.cell}>CG</th>
                        <th className={style.cell}>SHO</th>
                        <th className={style.cell}>SV</th>
                        <th className={style.cell}>IP</th>
                        <th className={style.cell}>H</th>
                        <th className={style.cell}>ER</th>
                        <th className={style.cell}>HR</th>
                        <th className={style.cell}>BB</th>
                        <th className={style.cell}>SO</th>
                        <th className={style.cell}>BAOpp</th>
                        <th className={style.cell}>ERA</th>
                        <th className={style.cell}>IBB</th>
                        <th className={style.cell}>WP</th>
                        <th className={style.cell}>HBP</th>
                        <th className={style.cell}>BK</th>
                        <th className={style.cell}>BFP</th>
                        <th className={style.cell}>GF</th>
                        <th className={style.cell}>R</th>
                        <th className={style.cell}>SH</th>
                        <th className={style.cell}>SF</th>
                        <th className={style.cell}>GIDP</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerStats?.pitching?.map(
                        (stat: PitchingStats) => (
                            <tr
                                className={style.tableRow}
                                key={stat.yearID}
                            >
                                <td
                                    className={
                                        style.cell
                                    }
                                >
                                    {stat.yearID}
                                </td>
                                <td className={style.cell}>
                                    {stat.W}
                                </td>
                                <td className={style.cell}>
                                    {stat.L}
                                </td>
                                <td className={style.cell}>
                                    {stat.G}
                                </td>
                                <td className={style.cell}>
                                    {stat.GS}
                                </td>
                                <td className={style.cell}>
                                    {stat.CG}
                                </td>
                                <td className={style.cell}>
                                    {stat.SHO}
                                </td>
                                <td className={style.cell}>
                                    {stat.SV}
                                </td>
                                <td className={style.cell}>
                                    {stat.IPouts}
                                </td>
                                <td className={style.cell}>
                                    {stat.H}
                                </td>
                                <td className={style.cell}>
                                    {stat.ER}
                                </td>
                                <td className={style.cell}>
                                    {stat.HR}
                                </td>
                                <td className={style.cell}>
                                    {stat.BB}
                                </td>
                                <td className={style.cell}>
                                    {stat.SO}
                                </td>
                                <td className={style.cell}>
                                    {stat.BAOpp}
                                </td>
                                <td className={style.cell}>
                                    {stat.ERA}
                                </td>
                                <td className={style.cell}>
                                    {stat.IBB}
                                </td>
                                <td className={style.cell}>
                                    {stat.WP}
                                </td>
                                <td className={style.cell}>
                                    {stat.HBP}
                                </td>
                                <td className={style.cell}>
                                    {stat.BK}
                                </td>
                                <td className={style.cell}>
                                    {stat.BFP}
                                </td>
                                <td className={style.cell}>
                                    {stat.GF}
                                </td>
                                <td className={style.cell}>
                                    {stat.R}
                                </td>
                                <td className={style.cell}>
                                    {stat.SH}
                                </td>
                                <td className={style.cell}>
                                    {stat.SF}
                                </td>
                                <td className={style.cell}>
                                    {stat.GIDP}
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>)
    }

    function FieldingStatsTable() {
        return (<div className={style.statSectionDiv}>
            <hr className={style.hr}/>
            <h2 className={style.h2}>Fielding</h2>
            <div className={style.tableDiv}>
                <table className={style.table}>
                    <thead className={style.tableHeader}>
                    <tr className={style.tableRow}>
                        <th className={style.cell}>
                            Year
                        </th>
                        <th className={style.cell}>POS</th>
                        <th className={style.cell}>G</th>
                        <th className={style.cell}>GS</th>
                        <th className={style.cell}>InnOuts</th>
                        <th className={style.cell}>PO</th>
                        <th className={style.cell}>A</th>
                        <th className={style.cell}>E</th>
                        <th className={style.cell}>DP</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerStats?.fielding?.map(
                        (stat: FieldingStats) => (
                            <tr
                                className={style.tableRow}
                                key={stat.yearID}
                            >
                                <td
                                    className={
                                        style.cell
                                    }
                                >
                                    {stat.yearID}
                                </td>
                                <td className={style.cell}>
                                    {stat.POS}
                                </td>
                                <td className={style.cell}>
                                    {stat.G}
                                </td>
                                <td className={style.cell}>
                                    {stat.GS}
                                </td>
                                <td className={style.cell}>
                                    {stat.InnOuts}
                                </td>
                                <td className={style.cell}>
                                    {stat.PO}
                                </td>
                                <td className={style.cell}>
                                    {stat.A}
                                </td>
                                <td className={style.cell}>
                                    {stat.E}
                                </td>
                                <td className={style.cell}>
                                    {stat.DP}
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>)
    }

    function CareerStatsTable() {
        if (!playerStats) {
            return null
        }
        const totalBattingStats: BattingStats = {}
        const totalPitchingStats: PitchingStats = {}
        const totalFieldingStats: FieldingStats = {}

        if (playerStats.batting && playerStats.batting.length > 0) {
            const totalG = playerStats.batting.reduce((acc, stat) => acc + (stat.G || 0), 0)
            const totalAB = playerStats.batting.reduce((acc, stat) => acc + (stat.AB || 0), 0)
            const totalR = playerStats.batting.reduce((acc, stat) => acc + (stat.R || 0), 0)
            const totalH = playerStats.batting.reduce((acc, stat) => acc + (stat.H || 0), 0)
            const total2B = playerStats.batting.reduce((acc, stat) => acc + (stat['2B'] || 0), 0)
            const total3B = playerStats.batting.reduce((acc, stat) => acc + (stat['3B'] || 0), 0)
            const totalHR = playerStats.batting.reduce((acc, stat) => acc + (stat.HR || 0), 0)
            const totalRBI = playerStats.batting.reduce((acc, stat) => acc + (stat.RBI || 0), 0)
            const totalSB = playerStats.batting.reduce((acc, stat) => acc + (stat.SB || 0), 0)
            const totalCS = playerStats.batting.reduce((acc, stat) => acc + (stat.CS || 0), 0)
            const totalBB = playerStats.batting.reduce((acc, stat) => acc + (stat.BB || 0), 0)
            const totalSO = playerStats.batting.reduce((acc, stat) => acc + (stat.SO || 0), 0)
            const totalIBB = playerStats.batting.reduce((acc, stat) => acc + (stat.IBB || 0), 0)
            const totalHBP = playerStats.batting.reduce((acc, stat) => acc + (stat.HBP || 0), 0)
            const totalSF = playerStats.batting.reduce((acc, stat) => acc + (stat.SF || 0), 0)
            const totalGIDP = playerStats.batting.reduce((acc, stat) => acc + (stat.GIDP || 0), 0)

            totalBattingStats['G'] = totalG
            totalBattingStats['AB'] = totalAB
            totalBattingStats['R'] = totalR
            totalBattingStats['H'] = totalH
            totalBattingStats['2B'] = total2B
            totalBattingStats['3B'] = total3B
            totalBattingStats['HR'] = totalHR
            totalBattingStats['RBI'] = totalRBI
            totalBattingStats['SB'] = totalSB
            totalBattingStats['CS'] = totalCS
            totalBattingStats['BB'] = totalBB
            totalBattingStats['SO'] = totalSO
            totalBattingStats['IBB'] = totalIBB
            totalBattingStats['HBP'] = totalHBP
            totalBattingStats['SF'] = totalSF
            totalBattingStats['GIDP'] = totalGIDP
        }

        if (playerStats.pitching && playerStats.pitching.length > 0) {
            const totalW = playerStats.pitching.reduce((acc, stat) => acc + (stat.W || 0), 0)
            const totalL = playerStats.pitching.reduce((acc, stat) => acc + (stat.L || 0), 0)
            const totalG = playerStats.pitching.reduce((acc, stat) => acc + (stat.G || 0), 0)
            const totalGS = playerStats.pitching.reduce((acc, stat) => acc + (stat.GS || 0), 0)
            const totalCG = playerStats.pitching.reduce((acc, stat) => acc + (stat.CG || 0), 0)
            const totalSHO = playerStats.pitching.reduce((acc, stat) => acc + (stat.SHO || 0), 0)
            const totalSV = playerStats.pitching.reduce((acc, stat) => acc + (stat.SV || 0), 0)
            const totalIPouts = playerStats.pitching.reduce((acc, stat) => acc + (stat.IPouts || 0), 0)
            const totalH = playerStats.pitching.reduce((acc, stat) => acc + (stat.H || 0), 0)
            const totalER = playerStats.pitching.reduce((acc, stat) => acc + (stat.ER || 0), 0)
            const totalHR = playerStats.pitching.reduce((acc, stat) => acc + (stat.HR || 0), 0)
            const totalBB = playerStats.pitching.reduce((acc, stat) => acc + (stat.BB || 0), 0)
            const totalSO = playerStats.pitching.reduce((acc, stat) => acc + (stat.SO || 0), 0)

            totalPitchingStats['W'] = totalW
            totalPitchingStats['L'] = totalL
            totalPitchingStats['G'] = totalG
            totalPitchingStats['GS'] = totalGS
            totalPitchingStats['CG'] = totalCG
            totalPitchingStats['SHO'] = totalSHO
            totalPitchingStats['SV'] = totalSV
            totalPitchingStats['IPouts'] = totalIPouts
            totalPitchingStats['H'] = totalH
            totalPitchingStats['ER'] = totalER
            totalPitchingStats['HR'] = totalHR
            totalPitchingStats['BB'] = totalBB
            totalPitchingStats['SO'] = totalSO

        }

        if (playerStats.fielding && playerStats.fielding.length > 0) {
            const totalG = playerStats.fielding.reduce((acc, stat) => acc + (stat.G || 0), 0)
            const totalGS = playerStats.fielding.reduce((acc, stat) => acc + (stat.GS || 0), 0)
            const totalInnOuts = playerStats.fielding.reduce((acc, stat) => acc + (stat.InnOuts || 0), 0)
            const totalPO = playerStats.fielding.reduce((acc, stat) => acc + (stat.PO || 0), 0)
            const totalA = playerStats.fielding.reduce((acc, stat) => acc + (stat.A || 0), 0)
            const totalE = playerStats.fielding.reduce((acc, stat) => acc + (stat.E || 0), 0)
            const totalDP = playerStats.fielding.reduce((acc, stat) => acc + (stat.DP || 0), 0)

            totalFieldingStats['G'] = totalG
            totalFieldingStats['GS'] = totalGS
            totalFieldingStats['InnOuts'] = totalInnOuts
            totalFieldingStats['PO'] = totalPO
            totalFieldingStats['A'] = totalA
            totalFieldingStats['E'] = totalE
            totalFieldingStats['DP'] = totalDP
        }


        return (
            <div className={style.statSectionDiv}>
                <hr className={style.hr}/>
                <h2 className={style.h2}>Career</h2>
                {playerStats.batting && playerStats.batting.length > 0 && (
                    <div className={style.tableDiv}>
                        <table className={style.table}>
                            <thead className={style.tableHeader}>
                            <tr className={style.tableRow}>
                                <th className={style.tableClickHeader}>

                                </th>
                                <th className={style.cell}>G</th>
                                <th className={style.cell}>AB</th>
                                <th className={style.cell}>R</th>
                                <th className={style.cell}>H</th>
                                <th className={style.cell}>2B</th>
                                <th className={style.cell}>3B</th>
                                <th className={style.cell}>HR</th>
                                <th className={style.cell}>RBI</th>
                                <th className={style.cell}>SB</th>
                                <th className={style.cell}>CS</th>
                                <th className={style.cell}>BB</th>
                                <th className={style.cell}>SO</th>
                                <th className={style.cell}>IBB</th>
                                <th className={style.cell}>HBP</th>
                                <th className={style.cell}>SF</th>
                                <th className={style.cell}>GIDP</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={style.tableRow}>
                                <td className={style.cell}>
                                    Batting
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.G}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.AB}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.R}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.H}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats['2B']}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats['3B']}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.HR}
                                </td>
                                <td className={style.cell
                                }>
                                    {totalBattingStats.RBI}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.SB}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.CS}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.BB}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.SO}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.IBB}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.HBP}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.SF}
                                </td>
                                <td className={style.cell}>
                                    {totalBattingStats.GIDP}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
                }
                {playerStats.pitching && playerStats.pitching.length > 0 && (
                    <div className={style.tableDiv}>
                        <table className={style.table}>
                            <thead className={style.tableHeader}>
                            <tr className={style.tableRow}>
                                <th className={style.tableClickHeader}>

                                </th>
                                <th className={style.cell}>W</th>
                                <th className={style.cell}>L</th>
                                <th className={style.cell}>G</th>
                                <th className={style.cell}>GS</th>
                                <th className={style.cell}>CG</th>
                                <th className={style.cell}>SHO</th>
                                <th className={style.cell}>SV</th>
                                <th className={style.cell}>IP</th>
                                <th className={style.cell}>H</th>
                                <th className={style.cell}>ER</th>
                                <th className={style.cell}>HR</th>
                                <th className={style.cell}>BB</th>
                                <th className={style.cell}>SO</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={style.tableRow}>
                                <td className={style.cell}>
                                    Pitching
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.W}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.L}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.G}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.GS}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.CG}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.SHO}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.SV}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.IPouts}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.H}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.ER}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.HR}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.BB}
                                </td>
                                <td className={style.cell}>
                                    {totalPitchingStats.SO}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {playerStats.fielding && playerStats.fielding.length > 0 && (
                    <div className={style.tableDiv}>
                        <table className={style.tableRow}>
                            <thead className={style.tableHeader}>
                            <tr className={style.tableRow}>
                                <th className={style.tableClickHeader}>

                                </th>
                                <th className={style.cell}>G</th>
                                <th className={style.cell}>GS</th>
                                <th className={style.cell}>InnOuts</th>
                                <th className={style.cell}>PO</th>
                                <th className={style.cell}>A</th>
                                <th className={style.cell}>E</th>
                                <th className={style.cell}>DP</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={style.tableRow}>
                                <td className={style.cell}>
                                    Fielding
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.G}
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.GS}
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.InnOuts}
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.PO}
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.A}
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.E}
                                </td>
                                <td className={style.cell}>
                                    {totalFieldingStats.DP}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={style.pageCard}>
            <div className={style.innerCard}>
                <div className={style.statSectionDiv}>
                    <h2 className={style.h2 + ' text-center'}>
                        Player Profile
                    </h2>
                    <div className={''}>
                        <a href={`/player/${playerID}`}>
                            <h2
                                className={
                                    style.h2 + ' ' + style.a
                                }
                            >
                                {playerData.nameFirst} {playerData.nameLast}
                            </h2>
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
                    <div>
                        <p>Positions: {[...new Set(playerStats?.fielding?.map((stat) => stat.POS))].join(', ')}</p>
                    </div>
                </div>
                <hr className={style.hr}/>

                <h2 className={style.h2 + ' text-center'}>
                    Career Statistics
                </h2>
                {<CareerStatsTable/>}


                <h2 className={style.h2 + ' text-center'}>
                    Season Statistics
                </h2>

                {playerStats?.batting && playerStats?.batting?.length > 0 ? (
                    <BattingStatsTable/>
                ) : null}

                {playerStats?.pitching && playerStats?.pitching?.length > 0 ? (
                    <PitchingStatsTable/>
                ) : null}

                {playerStats?.fielding && playerStats?.fielding?.length > 0 ? (
                    <FieldingStatsTable/>
                ) : null}
            </div>
        </div>
    )
}
