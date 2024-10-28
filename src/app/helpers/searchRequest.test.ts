import { User } from '../types/user'

import searchRequest from './searchRequest'

const noUser: User | null = null
const user: User = {
    email: 'testing@gmail.com',
    token: 'hjpn3l2yu68r5jio7qskc5br6dh7uvnmnm0bmnmp2zd',
    firstName: 'Test',
    lastName: 'User',
    password: '',
}

describe('searchRequest', () => {
    test('no user', async () => {
        const searchQuery = 'test'
        const response = await searchRequest(noUser, searchQuery)
        expect(response)
    })

    test('user', async () => {
        const searchQuery = 'test'
        const response = await searchRequest(user, searchQuery)
        expect(response)
    })
})

