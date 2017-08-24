import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { TextInput, Link, Button } from 'components/utility';
import { isValidEmail, isValidPassword } from '../utils';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.REQUIRED_FORM_FIELDS = ['email', 'password'];
        this.DEFAULT_ERRORS = {
            email: {
                highlight: false,
                message: null,
            },
            password: {
                highlight: false,
                message: null,
            },
        };

        this.state = {
            form: {
                email: '',
                password: '',
            },
            errors: this.DEFAULT_ERRORS,
        };
    }

    onFormInputChange(key, value) {
        if (this.state.form.hasOwnProperty(key)) {
            let updatedState = {
                form: { ...this.state.form },
            };

            updatedState['form'][key] = value;
            this.setState(updatedState);
        }
    }

    resetForm() {
        this.setState({
            form: {
                email: '',
                password: '',
            },
            errors: this.DEFAULT_ERRORS,
        });
    }

    validateForm(form) {
        const {
            email,
            password,
        } = form;
        let flags = {};

        if (!isValidEmail(email)) {
            flags.email = {
                highlight: true,
                message: 'Must provide a valid email',
            };
        }

        if (!isValidPassword(password)) {
            flags.password = {
                highlight: true,
                message: 'Must provide a valid password',
            }
        }

        this.setState({
            errors: {
                ...this.DEFAULT_ERRORS,
                ...flags,
            },
        });

        return _.isEmpty(flags);
    }


    onSubmitForm(e) {
        e.preventDefault();

        const form = _.pick(this.state.form, this.REQUIRED_FORM_FIELDS);
        const isValid = this.validateForm(form);

        if (isValid) {
            this.props.login(form.email, form.password);
            this.resetForm();
        }
    }

    render() {
        const {
            email: emailError,
            password: passwordError,
        } = this.state.errors;

        const { email, password } = this.state.form;

        return(
            <div className={`authentication-box ${this.props.loginType || ''} measure center ph4 pt6`}>
                <h1 className="karla white f2">
                    Log in
                </h1>
                <TextInput
                    className="auth-email mt4"
                    value={ email }
                    placeholder="your@email.edu"
                    onChange={e => this.onFormInputChange('email', e.target.value)} />
                <TextInput 
                    className="auth-password mv2"
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={e => this.onFormInputChange('password', e.target.value)} />
                <Button
                    backgroundColor="bg-wh-pink"
                    onClick={ this.onSubmitForm }
                    className="mb4">
                    Submit
                </Button>
                <div className="mb2">
                    <Link
                        to="/register"
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

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginPage;
