import Pupper from 'api/pupper';

const sendRecoveryEmail = email => {
    return Pupper.post(`/auth/recover`, {
        body: {
            email,
        },
    });
};

export default sendRecoveryEmail;
