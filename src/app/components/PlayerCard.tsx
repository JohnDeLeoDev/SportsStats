'use client'
import { Player } from '../types/player'
import { appContext } from '@/app/app'
import { getData } from '@/app/helpers/getData'
import React from 'react'

export default function PlayerComponent(props: { playerID: string }) {
    const playerID: string = props.playerID
    const [playerData, setPlayerData] = React.useState<Player | null>(null)
    const { userSession } = React.useContext(appContext)

    React.useEffect(() => {
        getData(userSession, 'player', playerID).then((data) => {
            setPlayerData(data)
            console.log(data)
        })
    }, [playerID, userSession])

    if (!playerData) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div>
                <div className="">
                    <a href={`/player/${playerID}`}>
                        <h1
                            className={
                                'text-4xl sm:text-xl text-center sm:text-left font-bold mb-4'
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
                    <p>Bats: {playerData.bats}</p>
                    <p>Throws: {playerData.throws}</p>
                </div>

                <div>
                    <p>Debut: {playerData.debut}</p>
                    <p>Final game: {playerData.finalGame}</p>
                </div>
            </div>
        </div>
    )
}
