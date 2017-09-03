import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ className, value="", type="text", placeholder="", onChange, highlight, memo="" }) => (
    <div className={`text-input w-100 ${className || ''}`}>
        <input
            className={`${className}
                karla pa2 input-reset br2 ba w-100
                ${highlight ? 'highlighted' : ''}
            `}
            type={ type }
            placeholder={ placeholder }
            value={ value || '' }
            onChange={ onChange } />
        { memo && 
            <div className="memo karla wh-pink f6 antialias mt1">{ memo }</div>
        }
    </div>
);

FormInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    highlight: PropTypes.bool,
    placeholder: PropTypes.string,
    memo: PropTypes.string,
    onChange: PropTypes.func,
};

export default FormInput;
