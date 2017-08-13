import Pupper from 'api/pupper';

const loginUser = (email, password) => {
    return Pupper.post('/auth/login', {
        body: {
            email,
            password,
        },
    });
};

export default loginUser;
