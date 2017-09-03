import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetUserPassword, sendResetPasswordEmail } from 'modules/auth';
import ResetPasswordPage from "components/reset-password";

const Verify = props => {
    const { token } = props.match.params;

    return <div className="app-view--reset-password">
        <ResetPasswordPage
            recoveryToken={token || ""}
            {...props} />
    </div>
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetUserPassword,
    sendResetPasswordEmail,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Verify);
