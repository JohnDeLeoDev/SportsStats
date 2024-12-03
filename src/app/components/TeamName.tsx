'use client'
import { Team } from '../types/team'
import { appContext } from '@/app/app'
import { getData } from '@/app/helpers/getData'
import React from 'react'

export default function PlayerName(props: { teamID: string }) {
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
    } else {
        return (
            <div>
                <h1>{teamData.name}</h1>
            </div>
        )
    }
}
