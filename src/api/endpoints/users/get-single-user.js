import Pupper from 'api/pupper';

export const getUserById = (token, id) => {
    return Pupper.get('/user', 
        Pupper.sign({
            queryParams: {
                id,
            },
        }, token));
};

export const getUserByEmail = (token, email) => {
    return Pupper.get('/user', 
        Pupper.sign({
            queryParams: {
                email,
            },
        }, token));
};

export const getUser = (token, id, email) => {
    return Pupper.get('/user', 
        Pupper.sign({
            queryParams: {
                id,
                email,
            },
        }, token));
};