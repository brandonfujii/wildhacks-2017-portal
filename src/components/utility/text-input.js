import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ className, value="", type, placeholder="", onChange }) => (
    <div className={`text-input w-100 ${className || ''}`}>
        <input
            className={`${className}
                karla pa2 input-reset br2 ba w-100
            `}
            type={ type }
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange } />
    </div>
);

TextInput.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextInput;