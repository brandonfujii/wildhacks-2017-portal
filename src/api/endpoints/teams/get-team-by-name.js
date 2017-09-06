import Pupper from 'api/pupper';

const getTeamByName = (token, name) => {
    return Pupper.get('/team',
        Pupper.sign({
            queryParams: {
                name,
            },
        }, token));
};

export default getTeamByName;
