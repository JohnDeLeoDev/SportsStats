import { CognitoUserSession } from 'amazon-cognito-identity-js'
import authHeaders from '../helpers/authorization'

export async function getQueries(userSession: CognitoUserSession) {
    const url =
        'https://34i8h13ttj.execute-api.us-east-1.amazonaws.com/default/ss_GetQueries'

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
        return await response.json()
    } catch (error) {
        console.error('Error:', error)
    }
}
