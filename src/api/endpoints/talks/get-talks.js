import Pupper from 'api/pupper';

const getTalks = (token, page = 1, limit = 25) => {
    return Pupper.get('/talk/all', Pupper.sign({
        queryParams: {
            page,
            limit,
        },
    }, token));
};

export default getTalks;
