import authHeaders from './authorization'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

export default async function searchRequest(
    searchQuery: string,
    userSession?: CognitoUserSession
) {
    const url =
        'https://aril0iseol.execute-api.us-east-1.amazonaws.com/default/ss_Search'

    const headers = authHeaders(userSession)

    const body = {
        searchQuery: searchQuery,
    }

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    }

    try {
        const response = await fetch(url, options)
        return await response.json()
    } catch (error) {
        console.error('Error:', error)
    }
}
