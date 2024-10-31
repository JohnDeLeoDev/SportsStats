import { signIn } from './signIn'
import { testCredentials } from './testCredentials'

test('signIn', async () => {
    const response = await signIn(
        testCredentials.username,
        testCredentials.password
    )

    expect(response)
})
