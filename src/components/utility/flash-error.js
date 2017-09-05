import React from 'react';
import PropTypes from 'prop-types';

const FlashError = ({ message }) => {
    if (message) {
        return (
            <span className="karla wh-pink f6 antialias">
                { message }
            </span>
        );
    }

    return null;
};

FlashError.propTypes = {
    message: PropTypes.string,
};

export default FlashError;
