import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormInput } from 'components/utility';
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
                message: 'Must provide a valid password',
            }
        } else {
            if (password === confirmPassword) {
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


    onSubmitForm(e) {
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

        return(
            <div className={`authentication registration`}>
                <form onSubmit={this.onSubmitForm.bind(this)}>
                    <FormInput
                        className="form-email"
                        placeholder="your@email.edu"
                        highlight={emailError.highlight}
                        value={this.state.form.email}
                        onChange={e => this.onFormInputChange('email', e.target.value)}
                        memo={emailError.message ? emailError.message : null} />
                    <FormInput
                        className="form-password"
                        placeholder="Password"
                        password
                        highlight={passwordError.highlight}
                        value={this.state.form.password}
                        onChange={e => this.onFormInputChange('password', e.target.value)}
                        memo={passwordError.message ? passwordError.message : null} />
                    <FormInput
                        className="form-confirm-password"
                        placeholder="Confirm password"
                        password
                        highlight={confirmPasswordError.highlight}
                        value={this.state.form.confirmPassword}
                        onChange={e => this.onFormInputChange('confirmPassword', e.target.value)}
                        memo={confirmPasswordError.message ? confirmPasswordError.message : null} />
                    <input 
                        type="submit" 
                        value="Submit" />
                </form>
            </div>
        );
    }
}

RegistrationPage.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegistrationPage;
