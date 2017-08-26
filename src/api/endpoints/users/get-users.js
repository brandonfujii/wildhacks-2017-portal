import Pupper from 'api/pupper';

const getUsers = (token, page = 1, limit = 10) => {
    return Pupper.get('/user/all', Pupper.sign({
        queryParams: {
            page,
            limit,
        },
    }, token));
};

export default getUsers;
