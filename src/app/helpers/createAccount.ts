import { User } from '../types/user'
import { userPool } from './userpool'
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'

export async function createAccount(
    user: User,
    password: string
): Promise<CognitoUser | string> {
    // make sure user is the correct type and has all the required fields
    if (!user.email || !user.firstName || !user.lastName || !password) {
        console.error('Missing required fields')
        return 'Missing required fields'
    }

    return new Promise((resolve, reject) => {
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: user.email,
            }),
            new CognitoUserAttribute({
                Name: 'given_name',
                Value: user.firstName,
            }),
            new CognitoUserAttribute({
                Name: 'family_name',
                Value: user.lastName,
            }),
        ]
        userPool.signUp(
            user.email,
            password,
            attributeList,
            null as never,
            (err, result) => {
                if (err) {
                    if (
                        (err as unknown as { code: string }).code ===
                        'UsernameExistsException'
                    ) {
                        reject('UsernameExistsException')
                    }
                    reject(err)
                } else {
                    resolve(result!.user)
                }
            }
        )
    })
}
