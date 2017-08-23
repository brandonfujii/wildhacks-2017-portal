import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextInput } from 'components/utility';
import Button from '../../assets/button';
import Link from '../../assets/link';

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
            this.setState({
                [formKey]: value
            });
        }
    }

    onSubmitForm = (e) => {
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
            <div className={`authentication-box ${this.props.loginType || ''} measure center ph4 pt6`}>
                <h1 className="karla white f2">
                    Log in
                </h1>
                <TextInput
                    className="auth-email mt4"
                    value={this.state.auth_email}
                    placeholder="Email"
                    onChange={e => this.onFormInputChange('email', e.target.value)} />
                <TextInput 
                    className="auth-password mv2"
                    type="password"
                    placeholder="Password"
                    value={this.state.auth_password}
                    onChange={e => this.onFormInputChange('password', e.target.value)} />
                <Button
                    backgroundColor="bg-wh-pink"
                    onClick={ this.onSubmitForm }
                    className="mb4">
                    Submit
                </Button>
                <div className="mb2">
                    <Link
                        to="/signup"
                        className="white"
                    >
                        Sign up
                    </Link>
                </div>
                <div>
                    <Link
                        to="/forgot"
                        className="white"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
        );
    }
}

AuthenticationBox.propTypes = {
    loginType: PropTypes.string,
    changeLoginType: PropTypes.func,
};

export default AuthenticationBox;
