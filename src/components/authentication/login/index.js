import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormInput, FlashError, Link, Button } from 'components/utility';
import { isValidEmail, isValidPassword } from '../utils';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.props.resetErrors();

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

    componentDidMount() {
        if (window.navigator.userAgent.indexOf("Edge") > -1) {
            this.props.displayBanner("You're using Edge, which doesn't support certain browser APIs used by this website. Please use a different browser like Chrome or Firefox.", 10000);
        }
    }

    onFormInputChange(key, value) {
        this.props.resetErrors();
        if (this.state.form.hasOwnProperty(key)) {
            let updatedState = {
                form: { ...this.state.form },
            };

            updatedState['form'][key] = value;
            this.setState(updatedState);
        }
    }

    resetForm() {
        this.props.resetErrors();
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
                message: 'Must provide a valid 8-character password',
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
            <div className="authentication-box measure center ph4 pt6">
                <h1 className="karla white f2 mb2 antialias">
                    Log in
                </h1>
                <div>
                    &nbsp;<FlashError message={this.props.error} />
                </div>
                <form 
                    onSubmit={ this.onSubmitForm }
                >
                    <FormInput
                        className="auth-email mt2"
                        value={ email }
                        highlight={emailError.highlight}
                        placeholder="your@email.edu"
                        onChange={e => this.onFormInputChange('email', e.target.value)}
                        memo={emailError.message ? emailError.message : null} />
                    <FormInput
                        className="auth-password mv2"
                        type="password"
                        highlight={passwordError.highlight}
                        placeholder="Password"
                        value={ password }
                        onChange={e => this.onFormInputChange('password', e.target.value)}
                        memo={passwordError.message ? passwordError.message : null} />
                    <Button
                        backgroundColor="bg-wh-pink"
                        onClick={ this.onSubmitForm }
                        className="mb4"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
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
    error: PropTypes.string,
};

export default LoginPage;
