import { User } from '../types/user'

export default function searchRequest(user: User | null, searchQuery: string) {
    // https://aril0iseol.execute-api.us-east-1.amazonaws.com/default/ss_Search
    // Endpoint URL
    const url =
        'https://aril0iseol.execute-api.us-east-1.amazonaws.com/default/ss_Search'

    // Request headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'qi4Xkv4meC1cJD03iNyxJ3chJRBic2wW5bCRhGDC',
        'Access-Control-Allow-Origin': '*',
    }

    // Request body
    const body = {
        query: searchQuery,
        email: user?.email,
        token: user?.token,
    }

    console.log(body)

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
            console.log(data)
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
