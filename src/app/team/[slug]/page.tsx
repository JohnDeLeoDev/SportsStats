'use client'
import { Team } from '../../types/team'
import { getData } from '../../helpers/getData'
import React from 'react'
import { appContext } from '../../app'

export default function TeamPage({ params }: { params: { slug: string } }) {
    const { userSession } = React.useContext(appContext)
    const teamID: string = params.slug
    const [teamData, setTeamData] = React.useState<Team | null>(null)

    React.useEffect(() => {
        getData(userSession, 'team', teamID, '').then((data) => {
            setTeamData(data)
        })
    }, [teamID, userSession])

    if (!teamData) {
        return <div className={'m-auto'}>Loading...</div>
    }

    return (
        <div className={'m-auto'}>
            <div>
                <div className="">
                    <a href={`/team/${teamData}`}>
                        <h1
                            className={
                                'text-4xl sm:text-xl text-center sm:text-left font-bold mb-4 text-blue-500'
                            }
                        >
                            {teamData.name}
                        </h1>
                    </a>
                </div>
            </div>
        </div>
    )
}
