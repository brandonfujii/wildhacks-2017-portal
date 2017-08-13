import Pupper from 'api/pupper';

const getPing = () => {
    return Pupper.get('/ping');
};

export default getPing;
