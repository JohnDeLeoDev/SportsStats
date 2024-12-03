'use client'
import { Team } from '../types/team'
import { appContext } from '@/app/app'
import { getData } from '@/app/helpers/getData'
import React from 'react'

export default function PlayerComponent(props: { teamID: string }) {
    const teamID: string = props.teamID
    const [teamData, setTeamData] = React.useState<Team | null>(null)
    const { userSession } = React.useContext(appContext)

    React.useEffect(() => {
        getData(userSession, 'team', teamID).then((data) => {
            setTeamData(data)
            console.log(data)
        })
    }, [teamID, userSession])

    if (!teamData) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div>
                <div className="">
                    <a href={`/team/${teamData.yearID}-${teamID}`}>
                        <h1
                            className={
                                'text-4xl sm:text-xl text-center sm:text-left font-bold mb-4 text-blue-500'
                            }
                        >
                            {teamData.name}
                        </h1>
                    </a>
                </div>
                <div>
                    <p>Year: {teamData.yearID}</p>
                    <p>Wins: {teamData.W}</p>
                    <p>Losses: {teamData.L}</p>
                </div>
            </div>
        </div>
    )
}
