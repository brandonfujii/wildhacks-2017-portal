import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyUser, resendVerificationEmail, rehydrateUserById } from 'modules/auth';
import VerificationPage from 'components/verify';

const Verify = props => {
    return <div className="app-view--verify">
        <VerificationPage
            verificationToken={props.verificationToken || ""}
            {...props} />
    </div>
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    verifyUser,
    resendVerificationEmail,
    rehydrateUserById,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Verify);
