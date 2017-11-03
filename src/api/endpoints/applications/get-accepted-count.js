import Pupper from 'api/pupper';

const getAcceptedCount = token => {
    return Pupper.get('/application/accepted',
        Pupper.sign({}, token));
};

export default getAcceptedCount;
