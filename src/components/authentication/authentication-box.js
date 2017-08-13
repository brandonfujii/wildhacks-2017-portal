import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextInput } from 'components/utility';

class AuthenticationBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth_email: '',
            auth_password: '',
        };
    }

    onFormInputChange(key, value) {
        const formKey = `auth_${key}`;

        if (this.state.hasOwnProperty(formKey)) {
            let updatedState = {};
            updatedState[formKey] = value;
            this.setState(updatedState);
        }
    }

    onSubmitForm(e) {
        e.preventDefault();
        
        const {
            auth_email: email,
            auth_password: password
        } = this.state;

        this.props.register(email, password);

        this.setState({
            auth_email: '',
            auth_password: '',
        });
    }

    render() {
        return(
            <div className={`authentication-box ${this.props.loginType}`}>
                <form onSubmit={this.onSubmitForm.bind(this)}>
                    <TextInput
                        className="auth-email"
                        value={this.state.auth_email}
                        onChange={e => this.onFormInputChange('email', e.target.value)} />
                    <TextInput 
                        className="auth-password" 
                        value={this.state.auth_password}
                        onChange={e => this.onFormInputChange('password', e.target.value)} />
                    <input 
                        type="submit" 
                        value="Submit" />
                </form>
            </div>
        );
    }
}

AuthenticationBox.propTypes = {
    loginType: PropTypes.string,
    changeLoginType: PropTypes.func,
};

export default AuthenticationBox;
