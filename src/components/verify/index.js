import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/utility';

const VerificationPage = props => (
    <div>
        <Button
          antialias
          backgroundColor="bg-wh-pink"
          onClick={() => props.verifyUser(props.verificationToken)}
          >
          Verify my account
        </Button>
    </div>
);

VerificationPage.propTypes = {
    verifyUser: PropTypes.func.isRequired,
    verificationToken: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default VerificationPage;
