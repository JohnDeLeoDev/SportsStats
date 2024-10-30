import authHeaders from './authorization'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

export default function searchPlayer(
    userSession: CognitoUserSession | null,
    searchQuery: string
) {
    // https://aril0iseol.execute-api.us-east-1.amazonaws.com/default/ss_Search
    // Endpoint URL
    const url =
        'https://6o7a01lmp1.execute-api.us-east-1.amazonaws.com/default/ss_SearchPlayer'

    // Request headers
    const headers = authHeaders(userSession)

    // Request body
    const body = {
        searchQuery: searchQuery,
    }

    // HTTP request options
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }

    // Send HTTP request
    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
