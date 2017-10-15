import Pupper from 'api/pupper';

const getUserData = (token, page = 1, limit = 10) => {
    return Pupper.get('/user/info/all', Pupper.sign({
        queryParams: {
            page,
            limit,
        },
    }, token));
};

export default getUserData;
