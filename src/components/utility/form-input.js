import React from 'react';
import PropTypes from 'prop-types';

const FormInput = (props) => (
    <div className={`text-input ${props.className}`}>
        <input
            className={`${props.className}-input ${props.highlight ? 'highlighted' : ''}`}
            type={props.password ? 'password' : 'text'}
            placeholder={props.placeholder}
            value={props.value || ""}
            onChange={props.onChange} />
        { props.memo && <div className="memo">{ props.memo }</div> }
    </div>
);

FormInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    password: PropTypes.bool,
    highlight: PropTypes.bool,
    placeholder: PropTypes.string,
    memo: PropTypes.string,
};

export default FormInput;
