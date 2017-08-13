import Pupper from 'api/pupper';

export const getUserById = (id) => {
    return Pupper.get('/users', {
        queryParams: {
            id,
        },
    });
};

export const getUserByEmail = (email) => {
    return Pupper.get('/users', {
        queryParams: {
            email,
        },
    });
};

export const getUser = (id, email) => {
    return Pupper.get('/users', {
        queryParams: {
            id,
            email,
        },
    });
};