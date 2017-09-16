import Pupper from 'api/pupper';

const getTalkById = (token, id) => {
    return Pupper.get('/talk', Pupper.sign({
        queryParams: {
            id,
        },
    }, token));
};

export default getTalkById;
