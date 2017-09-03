import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormComponent from './form-component';
import { isEmail } from 'components/utility';

class SendRecoveryEmailForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: '',
        };
    }

    updateEmail = (email) => {
        this.setState({
            email,
            error: '',
        });
    }

    onSendEmail = () => {
        if (isEmail(this.state.email)) {
            this.props.sendResetPasswordEmail(this.state.email);
            this.setState({
                email: ''
            });
        } else {
            this.setState({
                error: 'You must provide a valid email!',
            });
        }
    }

    render() {
        return (
            <div>
                <FormComponent
                    className="recovery-email-form"
                    onInputChange={this.updateEmail}
                    onSubmit={this.onSendEmail}
                    inputValue={this.state.email}
                    placeholder="Email"
                    buttonText="Send password recovery email"
                    error={this.state.error || this.props.error}
                />
            </div>
        );
    }
}


SendRecoveryEmailForm.propTypes = {
    sendResetPasswordEmail: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default SendRecoveryEmailForm;
