'use client'
import { Team } from '../../types/team'
import { getData } from '../../helpers/getData'
import React from 'react'
import { appContext } from '../../app'

export default function TeamPage({ params }: { params: { slug: string } }) {
    const { userSession } = React.useContext(appContext)
    const team: string = params.slug
    const teamID = team.split('-')[1]
    const yearID = team.split('-')[0]
    const [teamData, setTeamData] = React.useState<Team | null>(null)

    React.useEffect(() => {
        getData(userSession, 'team', teamID, yearID).then((data) => {
            setTeamData(data)
        })
    }, [teamID, userSession, yearID])

    if (!teamData) {
        return <div className={'m-auto'}>Loading...</div>
    }

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
            </div>
        </div>
    )
}
