import { getPing, registerUser, loginUser, deleteUserById, updateApplication } from './index';

const testEmail = "test@email.edu";
const testPassword = "testpassword";
let testUser = null,
    authKey = null;

expect.extend({
    toBeOk(response) {
        const meta = response.meta;
        const OK = 200;
        const pass = meta && meta.statusCode && meta.statusCode === OK;
        
        if (pass) {
            return {
                message: () => (
                    `received successful ${OK} response`
                ),
                pass: true,
            };
        } else {
            return {
                message: () => (
                    `expected ${OK} status code, but received ${meta.statusCode}`
                ),
                pass: false,
            };
        }
    }
});

beforeAll(async () => {
    await registerUser(testEmail, testPassword);
    const response = await loginUser(testEmail, testPassword);
    const user = response.user;

    if (user && user.token) {
        authKey = user.token.value;
        testUser = user;
    }
});

afterAll(async () => {
    await deleteUserById(authKey, testUser.id);
});

test('gets pong', async () => {
    const response = await getPing();
    expect(response).toBeOk();
    expect(response.pong).toBeTruthy();
});