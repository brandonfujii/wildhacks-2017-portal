import Pupper from 'api/pupper';

const getTeamById = (token, id) => {
    return Pupper.get('/team',
        Pupper.sign({
            queryParams: {
                id,
            },
        }, token));
};

export default getTeamById;
