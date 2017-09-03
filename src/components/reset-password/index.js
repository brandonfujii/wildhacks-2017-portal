import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordForm from './reset-password-form';
import SendRecoveryEmailForm from "./send-recovery-email-form";

const ResetPassword = props => (
    <div>
        { props.recoveryToken && <ResetPasswordForm {...props} /> }
        { !props.recoveryToken && <SendRecoveryEmailForm {...props} />}
    </div>
);


ResetPassword.propTypes = {
    resetUserPassword: PropTypes.func.isRequired,
    sendResetPasswordEmail: PropTypes.func.isRequired,
    recoveryToken: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default ResetPassword;
