import {AuthenticationDetails, CognitoUser, CognitoUserSession} from "amazon-cognito-identity-js";
import { userPool } from "./userpool";

export function signIn(email: string, password: string): Promise<CognitoUserSession> {
    const user = new CognitoUser({
        Username: email,
        Pool: userPool
    })

    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    })

    const res = new Promise<CognitoUserSession>((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                resolve(data)
            },
            onFailure: (err) => {
                reject(err)
            }
        })
    })

    return res
}
