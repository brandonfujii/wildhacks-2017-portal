import Pupper from 'api/pupper';

const resetPassword = (recoveryToken, password) => {
    return Pupper.post(`/auth/reset/${recoveryToken}`, {
        body: {
            password,
        },
    });
};

export default resetPassword;
