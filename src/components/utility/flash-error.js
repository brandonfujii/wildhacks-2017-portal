import React from 'react';
import PropTypes from 'prop-types';

const FlashError = ({ message }) => {
    if (message) {
        return (
            <div className="karla wh-pink f6 antialias">
                { message }
            </div>
        );
    }

    return null;
};

FlashError.propTypes = {
    message: PropTypes.string,
};

export default FlashError;
