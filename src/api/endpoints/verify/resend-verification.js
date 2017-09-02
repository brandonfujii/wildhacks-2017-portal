import Pupper from 'api/pupper';

const resendVerification = authToken => {
    return Pupper.post(`/auth/resend`,
        Pupper.sign({}, authToken));
};

export default resendVerification;
