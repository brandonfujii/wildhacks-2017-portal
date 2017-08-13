import Pupper from 'api/pupper';

export const getUserById = (id) => {
    return Pupper.get('/user', {
        queryParams: {
            id,
        },
    });
};

export const getUserByEmail = (email) => {
    return Pupper.get('/user', {
        queryParams: {
            email,
        },
    });
};

export const getUser = (id, email) => {
    return Pupper.get('/user', {
        queryParams: {
            id,
            email,
        },
    });
};