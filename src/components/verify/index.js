import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlashError, Link } from 'components/utility';

const VerificationPage = props => (
    <div className="mw6 pt6 center">
        <FlashError message={props.error} />
        <h1 className="karla white f2 mb2 antialias">
            Verify Account
        </h1>
        <div className="mt4 mb2">
            <Button
                antialias
                backgroundColor="bg-wh-pink"
                onClick={() => props.verifyUser(props.verificationToken)}
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
    error: PropTypes.string,
};

export default VerificationPage;
