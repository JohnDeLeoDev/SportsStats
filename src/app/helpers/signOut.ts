import { CognitoUserSession } from 'amazon-cognito-identity-js'
import authHeaders from './authorization'

export async function signOut(userSession: CognitoUserSession) {
    const url =
        'https://d6d7x2tz90.execute-api.us-east-1.amazonaws.com/default/ss_Logout'

    // Request headers
    const headers = authHeaders(userSession)

    // Request body
    const body = {}

    // HTTP request options
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }

    // Send HTTP request
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error:', error)
    }
}
