import Pupper from 'api/pupper';

const verifyToken = (authToken, verificationToken) => {
    return Pupper.post(`/auth/verify/${verificationToken}/`,
        Pupper.sign({}, authToken));
};

export default verifyToken;
