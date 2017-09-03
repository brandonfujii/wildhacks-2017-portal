import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlashError, FormInput } from 'components/utility';

const FormComponent = ({ className="", onSubmit, onInputChange, inputValue, buttonText="Submit", error, placeholder="", password=false }) => (
    <div className={ className }>
        <FlashError message={error}/>
        <form onSubmit={ onSubmit }>
            <FormInput
                type={ password ? "password" : ""}
                onChange={e => onInputChange(e.target.value)}
                value={inputValue}
                placeholder={ placeholder }
            />
            <Button
                antialias
                backgroundColor="bg-wh-pink"
                onClick={ onSubmit }
            >
                { buttonText }
            </Button>
        </form>
    </div>
);

FormComponent.propTypes = {
    className: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    placeholder: PropTypes.string,
    password: PropTypes.bool,
    error: PropTypes.string,
};

export default FormComponent;
