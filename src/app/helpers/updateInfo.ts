import {CognitoUserAttribute, CognitoUserSession,} from 'amazon-cognito-identity-js'
import {userPool} from '@/app/helpers/userpool'

export const updateInfo = async (
    user: CognitoUserSession,
    attributeType: string,
    email?: string,
    currentPassword?: string,
    newPassword?: string
) => {
    // get the cognito user from cognito user session
    const cognitoUser = userPool.getCurrentUser()
    if (!cognitoUser) {
        throw new Error('No current user')
    }
    cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
            if (err || !session || !session.isValid()) {
                console.error('User session is invalid or expired:', err)
                return
            }
        }
    )
    // update the user's info
    if (attributeType === 'email') {
        const attributeList = []
        const attribute = new CognitoUserAttribute({
            Name: 'email',
            Value: email || '',
        })
        attributeList.push(attribute)
        await cognitoUser.updateAttributes(
            attributeList,
            (err: Error | undefined, result?: string) => {
                if (err !== undefined) {
                    return err
                }
                return result || ''
            }
        )
    } else if (attributeType === 'password') {
        if (!currentPassword || !newPassword) {
            throw new Error(
                'Both currentPassword and newPassword are required for changing the password.'
            )
        }
        await cognitoUser.changePassword(
            currentPassword,
            newPassword,
            (err: Error | undefined, result?: string) => {
                if (err !== undefined) {
                    console.log(err)
                    return err
                }
                return result || ''
            }
        )
    }
    return 'success'
}

export const verifyInfo = async (
    user: CognitoUserSession,
    attributeType: string,
    code: string
) => {
    // get the cognito user from cognito user session
    const cognitoUser = userPool.getCurrentUser()
    if (!cognitoUser) {
        throw new Error('No current user')
    }
    cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
            if (err || !session || !session.isValid()) {
                console.error('User session is invalid or expired:', err)
                return
            }
        }
    )
    console.log('attributeType:', attributeType)
    console.log('code:', code)
    // verify the user's info and return the response from cognito
    if (attributeType === 'email') {
        await cognitoUser.verifyAttribute('email', code, {
            onSuccess: () => {
                return 'success'
            },
            onFailure: (err: Error) => {
                console.log(err)
                return err
            },
        })
    } else {
        await cognitoUser.verifyAttribute('phone_number', code, {
            onSuccess: () => {
                return 'success'
            },
            onFailure: (err: Error) => {
                console.log(err)
                return err
            },
        })
    }
    return 'success'
}
