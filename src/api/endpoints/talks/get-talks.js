import Pupper from 'api/pupper';

const getTalks = (token, page = 1, limit = 25, order = null) => {
    return Pupper.get('/talk/all', Pupper.sign({
        queryParams: {
            page,
            limit,
            order,
        },
    }, token));
};

export default getTalks;
