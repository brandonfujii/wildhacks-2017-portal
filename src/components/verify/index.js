import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FlashError, Link } from 'components/utility';

class VerificationPage extends Component {
    constructor(props) {
        super(props);
        this.props.rehydrateUserById(this.props.user.id);
    }

    onVerify = () => {
        this.props.verifyUser(this.props.verificationToken)
            .then(() => this.props.rehydrateUserById(this.props.user.id));
    }

    render() {
        return this.props.user && this.props.user.isVerified
                ? <VerifiedMessage />
                : <SendVerification onVerify={this.onVerify} {...this.props} />;
    }
}

const VerifiedMessage = props => (
    <div className="mw6 pt6 center">
        <h1 className="karla white f2 mb2 antialias">
            Your account has been verified!
        </h1>
    </div>
);

const SendVerification = props => (
    <div className="mw6 pt6 center">
        <FlashError message={props.error} />
        <h1 className="karla white f2 mb2 antialias">
            Verify Account
        </h1>
        <div className="mt4 mb2">
            <Button
                antialias
                backgroundColor="bg-wh-pink"
                onClick={props.onVerify}
            >
            Verify my account
            </Button>
        </div>
        <div className="">
            <Link
                className="white antialias"
                onClick={() => props.resendVerificationEmail()}
            >
                Resend verification email
            </Link>
        </div>
    </div>
);

VerificationPage.propTypes = {
    verifyUser: PropTypes.func.isRequired,
    resendVerificationEmail: PropTypes.func.isRequired,
    verificationToken: PropTypes.string.isRequired,
    user: PropTypes.object,
    error: PropTypes.string,
};

export default VerificationPage;
