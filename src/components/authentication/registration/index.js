import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormInput, FlashError, Link, Button } from 'components/utility';
import { isValidEmail, isValidPassword } from '../utils';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.REQUIRED_FORM_FIELDS = ['email', 'password', 'confirmPassword'];
        this.DEFAULT_ERRORS = {
            email: {
                highlight: false,
                message: null,
            },
            password: {
                highlight: false,
                message: null,
            },
            confirmPassword: {
                highlight: false,
                message: null,
            },
        };

        this.state = {
            form: {
                email: '',
                password: '',
                confirmPassword: '',
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
                confirmPassword: '',
            },
            errors: this.DEFAULT_ERRORS,
        });
    }

    validateForm(form) {
        const {
            email,
            password,
            confirmPassword,
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
                message: 'Must provide a valid 8-character password',
            }
        } else {
            if (password !== confirmPassword) {
                flags.confirmPassword = {
                    highlight: true,
                    message: 'Passwords must match',
                }
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


    onSubmitForm = (e) => {
        e.preventDefault();

        const form = _.pick(this.state.form, this.REQUIRED_FORM_FIELDS);
        const isValid = this.validateForm(form);

        if (isValid) {
            this.props.register(form.email, form.password);
            this.resetForm();
        }
    }

    render() {
        const {
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        } = this.state.errors;

        const { email, password, confirmPassword } = this.state.form;

        return(
            <div className={`authentication-box measure center ph4 pt6`}>
                <h1 className="karla white f2 mb4">
                    Sign up
                </h1>
                <FlashError message={this.props.error} />
                <FormInput
                    className="form-email mt4"
                    placeholder="your@email.edu"
                    highlight={emailError.highlight}
                    value={ email }
                    onChange={e => this.onFormInputChange('email', e.target.value)}
                    memo={emailError.message ? emailError.message : null} />
                <FormInput
                    className="form-password mt2"
                    placeholder="Password"
                    type="password"
                    highlight={passwordError.highlight}
                    value={ password }
                    onChange={e => this.onFormInputChange('password', e.target.value)}
                    memo={passwordError.message ? passwordError.message : null} />
                <FormInput
                    className="form-confirm-password mv2"
                    placeholder="Confirm password"
                    type="password"
                    highlight={ confirmPasswordError.highlight }
                    value={ confirmPassword }
                    onChange={e => this.onFormInputChange('confirmPassword', e.target.value)}
                    memo={confirmPasswordError.message ? confirmPasswordError.message : null} />
                <Button
                    backgroundColor="bg-wh-pink"
                    onClick={ this.onSubmitForm }
                    className="mb4">
                    Submit
                </Button>
                <div className="mb2">
                    <Link
                        to="/login"
                        className="white"
                    >
                        Log in
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

RegistrationPage.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegistrationPage;
