import Pupper from 'api/pupper';

const getApplication = token => {
    return Pupper.get('/application',
        Pupper.sign({}, token));
};

export default getApplication;
