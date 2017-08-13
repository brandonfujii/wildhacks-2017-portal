import Pupper from 'api/pupper';

const registerUser = (email, password) => {
    return Pupper.post('/auth/register', {
        body: {
            email,
            password,
        },
    });
};

export default registerUser;