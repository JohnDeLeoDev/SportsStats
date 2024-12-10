'use client'
import {Player} from '../types/player'
import {appContext} from '@/app/app'
import {getData} from '@/app/helpers/getData'
import React from 'react'

export default function PlayerName(props: { playerID: string }) {
    const playerID: string = props.playerID
    const [playerData, setPlayerData] = React.useState<Player | null>(null)
    const {userSession} = React.useContext(appContext)

    React.useEffect(() => {
        getData(userSession, 'player', playerID, '').then((data) => {
            setPlayerData(data)
        })
    }, [playerID, userSession])

    if (!playerData) {
        return <div>Loading...</div>
    } else {
        return (
            <h1>
                {playerData.nameFirst} {playerData.nameLast}
            </h1>
        )
    }
}
