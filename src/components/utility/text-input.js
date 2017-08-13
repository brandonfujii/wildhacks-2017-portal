import React from 'react';
import PropTypes from 'prop-types';

const TextInput = props => (
    <div className={`text-input ${props.className}`}>
        <input
            className={`${props.className}-input`}
            type="text"
            value={props.value || ""}
            onChange={props.onChange} />
    </div>
);

TextInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextInput;