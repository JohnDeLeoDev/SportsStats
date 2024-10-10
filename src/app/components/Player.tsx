'use client'
import { Player } from '../types/player'

export default function PlayerComponent(props: { player: Player }) {
    return (
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div>
                <div className="">
                    <h1>First Name: {props.player.nameFirst}</h1>
                    <h1>Last Name: {props.player.nameLast}</h1>
                </div>
                <div>
                    <p>
                        Born: {props.player.birthMonth}/{props.player.birthDay}/
                        {props.player.birthYear}
                    </p>

                    {props.player.deathYear ? (
                        <p>
                            Died: {props.player.deathMonth}/
                            {props.player.deathDay}/{props.player.deathYear}
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>

                <p>
                    Place of Birth: {props.player.birthCity},{' '}
                    {props.player.birthState}, {props.player.birthCountry}
                </p>
                <div>
                    <p>Weight: {props.player.weight} lbs</p>
                    <p>
                        Height: {(Number(props.player.height) / 12).toFixed(0)}{' '}
                        feet, {Number(props.player.height) % 12} inches
                    </p>
                </div>

                <div>
                    <p>Bats: {props.player.bats}</p>
                    <p>Throws: {props.player.throws}</p>
                </div>

                <div>
                    <p>Debut: {props.player.debut}</p>
                    <p>Final game: {props.player.finalGame}</p>
                </div>
            </div>
            <div>
                <h1>Career Stats</h1>
            </div>
        </div>
    )
}
