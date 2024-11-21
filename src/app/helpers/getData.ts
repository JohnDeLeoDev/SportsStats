import { CognitoUserSession } from 'amazon-cognito-identity-js'
import authHeaders from '@/app/helpers/authorization'

export async function getData(
    userSession: CognitoUserSession | null,
    dataType: string,
    dataId: string
) {
    const url =
        'https://2nr77cbpx9.execute-api.us-east-1.amazonaws.com/default/ss_GetData'

    // Request headers
    const headers = authHeaders(userSession)

    console.log(dataId)

    // Request body
    const body = {
        dataType: dataType,
        dataId: dataId,
    }

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
