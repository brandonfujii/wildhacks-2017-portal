import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormComponent from './form-component';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            error: '',
        };
    }

    updatePassword = (password) => {
        this.setState({
            newPassword: password,
            error: '',
        });
    }

    onSubmitNewPassword = () => {
        if (this.state.newPassword.length >= 8) {
            this.props.resetUserPassword(this.props.recoveryToken, this.state.newPassword);
            this.setState({
                newPassword: ''
            });
        } else {
            this.setState({
               error: 'Password must be at least 8 characters long',
            });
        }
    }

    render() {
        return (
            <FormComponent
                className="reset-password-form"
                onInputChange={this.updatePassword}
                onSubmit={this.onSubmitNewPassword}
                inputValue={this.state.newPassword}
                password={true}
                placeholder="New password"
                buttonText="Reset password"
                error={this.state.error || this.props.error}
            />
        );
    }
}

ResetPasswordForm.propTypes = {
    resetUserPassword: PropTypes.func.isRequired,
    recoveryToken: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default ResetPasswordForm;
