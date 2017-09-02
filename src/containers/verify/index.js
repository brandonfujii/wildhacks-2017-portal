import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyUser } from 'modules/auth';
import VerificationPage from "../../components/verify/index";

const Verify = props => {
    const { token } = props.match.params;

    return <div className="app-view--verify">
        <VerificationPage
            verificationToken={token || ""}
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
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Verify);
