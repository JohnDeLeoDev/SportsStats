import { CognitoUserSession } from 'amazon-cognito-identity-js'

export default function authHeaders(userSession: CognitoUserSession): {
    [key: string]: string
} {
    if (userSession) {
        return {
            'Content-Type': 'application/json',
            Authorization: userSession.getIdToken().getJwtToken(),
        }
    } else {
        return {
            'Content-Type': 'application/json',
        }
    }
}
