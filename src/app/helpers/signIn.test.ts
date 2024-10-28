import {signIn} from './signIn';

const email = 'testing@gmail.com';
const password = 'testing';

test('signIn', async () => {
    const response = await signIn(email, password);

    expect(response.token).toBeTruthy();
})