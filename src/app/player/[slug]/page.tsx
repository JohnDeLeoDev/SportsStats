'use client'
import { Player } from '../../types/player'
import { getData } from '../../helpers/getData'
import React from 'react'
import { appContext } from '../../app'

export default function PlayerPage({ params }: { params: { slug: string } }) {
    const { userSession } = React.useContext(appContext)
    const playerID: string = params.slug
    const [playerData, setPlayerData] = React.useState<Player | null>(null)

    React.useEffect(() => {
        getData(userSession, 'player', playerID, '').then((data) => {
            setPlayerData(data)
        })
    }, [playerID, userSession])

    if (!playerData) {
        return <div>Loading...</div>
    }

    return (
        <div className={'m-auto'}>
            <div>
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
                <div>
                    <p>BBRef ID: {playerData.bbrefID}</p>
                    <p>Retro ID: {playerData.retroID}</p>
                </div>
            </div>
        </div>
    )
}
