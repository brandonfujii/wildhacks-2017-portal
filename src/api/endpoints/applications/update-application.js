import Pupper, { Doggo } from 'api/pupper';

const updateApplication = (token, entries = {}) => {
    return Doggo.put('/application/update',
        Pupper.sign({
            body: entries,
        }, token));
};

export default updateApplication;
