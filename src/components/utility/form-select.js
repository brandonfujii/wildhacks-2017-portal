import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';

const FormSelect = ({ className, options = [], value, onChange, placeholder="", highlight, memo=""}) => (
    <div className={`karla
        ${className || ''}
        ${highlight ? 'highlighted' : ''}`}
    >
        <Select
            value={ value }
            options={ options }
            placeholder={ placeholder }
            onChange={ onChange }
        />
        { memo &&
            <div className="memo karla wh-pink f6 antialias mt1">{ memo }</div>
        }
    </div>
);

FormSelect.propTypes = {
    className: PropTypes.string,
    highlight: PropTypes.bool,
    memo: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default FormSelect;
