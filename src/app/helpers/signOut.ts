export function signOut(email: string, token: string) {
    const url =
        'https://d6d7x2tz90.execute-api.us-east-1.amazonaws.com/default/ss_Logout'

    // Request headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'isVR6O5mhw4XRCZ34Dsdl5r7mHMWH2O11to6yFMW',
        'Access-Control-Allow-Origin': '*',
    }

    // Request body
    const body = {
        email: email,
        token: token,
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
            console.log(data)
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
