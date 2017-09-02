import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlashError, Link } from 'components/utility';

const VerificationPage = props => (
    <div>
        <FlashError message={props.error} />
        <Button
          antialias
          backgroundColor="bg-wh-pink"
          onClick={() => props.verifyUser(props.verificationToken)}
          >
          Verify my account
        </Button>
        <Link
            onClick={() => props.resendVerificationEmail()}
            className="white"
            >
            Resend verification email
        </Link>
    </div>
);

VerificationPage.propTypes = {
    verifyUser: PropTypes.func.isRequired,
    resendVerificationEmail: PropTypes.func.isRequired,
    verificationToken: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default VerificationPage;
