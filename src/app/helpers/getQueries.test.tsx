import {getQueries} from './getQueries';
import {CognitoUserSession} from 'amazon-cognito-identity-js';

jest.mock('amazon-cognito-identity-js');
jest.mock('../helpers/authorization', () => jest.fn(() => ({Authorization: 'Bearer token'})));

describe('getQueries', () => {
    let userSession: CognitoUserSession;

    beforeEach(() => {
        userSession = new CognitoUserSession({
            IdToken: {
                getJwtToken: (): string => 'mockIdToken',
                getExpiration: (): number => Math.floor(Date.now() / 1000) + 3600,
                getIssuedAt: (): number => Math.floor(Date.now() / 1000),
                decodePayload: (): Record<string, unknown> => ({sub: 'mockSub', email: 'mockEmail@example.com'}),
                payload: {sub: 'mockSub', email: 'mockEmail@example.com'}
            },
            AccessToken: {
                getJwtToken: (): string => 'mockAccessToken',
                getExpiration: (): number => Math.floor(Date.now() / 1000) + 3600,
                getIssuedAt: (): number => Math.floor(Date.now() / 1000),
                decodePayload: (): Record<string, unknown> => ({scope: 'mockScope'}),
                payload: {scope: 'mockScope'}
            },
            RefreshToken: {getToken: (): string => 'mockRefreshToken'},
        });
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch queries successfully', async () => {
        const mockResponse = {queries: ['query1', 'query2']};
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await getQueries(userSession);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://34i8h13ttj.execute-api.us-east-1.amazonaws.com/default/ss_GetQueries',
            {
                method: 'POST',
                headers: {Authorization: 'Bearer token'},
                body: JSON.stringify({}),
            }
        );
        expect(result).toEqual(mockResponse);
    });

    it('should handle fetch error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch error'));

        await expect(getQueries(userSession)).resolves.toBeUndefined();
        expect(global.fetch).toHaveBeenCalledWith(
            'https://34i8h13ttj.execute-api.us-east-1.amazonaws.com/default/ss_GetQueries',
            {
                method: 'POST',
                headers: {Authorization: 'Bearer token'},
                body: JSON.stringify({}),
            }
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', new Error('Fetch error'));

        consoleErrorSpy.mockRestore();
    });
});