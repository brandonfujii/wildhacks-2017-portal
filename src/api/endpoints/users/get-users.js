import Pupper from 'api/pupper';

const getUsers = (token, page = 1, limit = 10) => {
    return Pupper.get('/user/all', {
        queryParams: {
            page,
            limit,
        },
        headers: {
            'X-Access-Token': `Bearer ${token}`,
        }
    });
};

export default getUsers;
