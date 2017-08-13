import Pupper from 'api/pupper';

const getUsers = (page = 1, limit = 10) => {
    return Pupper.get('/users/all', {
        queryParams: {
            page,
            limit,
        },
    });
};

export default getUsers;