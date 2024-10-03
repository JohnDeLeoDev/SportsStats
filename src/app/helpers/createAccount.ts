import { User } from '../types/user'

export async function createAccount(user: User) {
    // make sure user is the correct type and has all the required fields
    if (!user.email || !user.firstName || !user.lastName || !user.password) {
        console.error('Missing required fields')
        return
    }

    const url =
        'https://2vqzq2cs9k.execute-api.us-east-1.amazonaws.com/default/ss_CreateAccount'

    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'yBd6Hxo13a5NC1W80mFBI2DbbpOIl9Cp6HJwM3sS',
        'Access-Control-Allow-Origin': '*',
    }

    const body = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
    }

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }

    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
