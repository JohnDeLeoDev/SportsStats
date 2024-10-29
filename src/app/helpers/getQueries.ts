import {CognitoUserSession} from "amazon-cognito-identity-js";


export function getQueries(accessToken: CognitoUserSession) {
    const url =
        'https://34i8h13ttj.execute-api.us-east-1.amazonaws.com/default/ss_GetQueries'

    // Request headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'gQoJbHTohJ2wq8zkaQGJAaKnboT70B8V2GraDO4i',
        'Access-Control-Allow-Origin': '*',
    }

    // Request body
    const body = {
        accessToken: accessToken.getAccessToken().getJwtToken(),
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
