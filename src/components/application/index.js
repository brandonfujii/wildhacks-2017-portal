import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import snakeCase from 'lodash/snakeCase';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validation from './validation';
import { FormInput, FormSelect, Button, Link } from 'components/utility';

import colleges from './data/colleges.json';
import gradYears from './data/grad-years.json'
import ethnicities from './data/ethnicities.json';
import genders from './data/genders.json';
import tshirtSizes from './data/tshirt-sizes.json';
import collegeOptions from './data/college-options.json';
import gradYearOptions from './data/grad-year-options.json';
import { ethnicityOptions, ethnicityMapping } from './data/ethnicity-options';
import { genderOptions, genderMapping } from './data/gender-options';
import { tshirtSizeOptions, tshirtSizeMapping } from './data/tshirt-size-options';


class Application extends Component {
    constructor(props) {
        super(props);

        const { getApp } = props;
        getApp().then(() => {
            this.setState({
                ready: true
            });
        });

        this.VALIDATIONS = {
            firstName: {
                required: true,
                validate: {
                    fn: validation.isString,
                    message: 'Must be a valid string',
                },
            },
            lastName: {
                required: true,
                validate: {
                    fn: validation.isString,
                    message: 'Must be a valid string',
                }
            },
            age: {
                required: true,
                validate: {
                    fn: validation.isNumber,
                    message: 'Must be a number',
                }
            },
            ethnicity: {
                enum: ethnicities,
            },
            gender: {
                enum: genders,
            },
            school: {
                required: true,
                enum: colleges,
            },
            major: {
                required: true,
                validate: {
                    fn: validation.isString,
                    message: 'Must be a valid string',
                },
            },
            gradYear: {
                required: true,
                enum: gradYears,
            },
            numPrevHackathons: {
                validate: {
                    fn: validation.isNumber,
                    message: 'Must be a number',
                },
            },
            tshirtSize: {
                enum: tshirtSizes,
                required: true,
            },
            personalWebsite: {
                validate: {
                    fn: validation.isWebsite,
                    message: 'Must be a valid website',
                },
            },
            githubUsername: {
                validate: {
                    fn: validation.isString,
                    message: 'Must be a valid string',
                },
            },
            resume: {
                type: 'file',
            },
        };

        this.DEFAULT_ERRORS = {
            firstName: {
                highlight: false,
                message: null,
            },
            lastName: {
                highlight: false,
                message: null,
            },
            age: {
                highlight: false,
                message: null,
            },
            ethnicity: {
                highlight: false,
                message: null,
            },
            gender: {
                highlight: false,
                message: null,
            },
            school: {
                highlight: false,
                message: null,
            },
            major: {
                highlight: false,
                message: null,
            },
            gradYear: {
                highlight: false,
                message: null,
            },
            numPrevHackathons: {
                highlight: false,
                message: null,
            },
            tshirtSize: {
                highlight: false,
                message: null,
            },
            personalWebsite: {
                highlight: false,
                message: null,
            },
            githubUsername: {
                highlight: false,
                message: null,
            },
            resume: {
                highlight: false,
                message: null,
            },
        };

        this.state = {
            app: {
                firstName: '',
                lastName: '',
                age: '',
                ethnicity: null,
                gender: null,
                school: '',
                major: '',
                gradYear: '',
                numPrevHackathons: '',
                tshirtSize: '',
                personalWebsite: '',
                githubUsername: '',
                resume: null,
            },
            errors: this.DEFAULT_ERRORS,
            message: null,
            submitted: false,
            ready: false,
            hasApp: false,
            closed: true,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.isRequestingUpdate;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.app) {
            return;
        }

        const {
            firstName,
            lastName,
            age,
            gender,
            ethnicity,
            school,
            major,
            gradYear,
            numPrevHackathons,
            tshirtSize,
            personalWebsite,
            githubUsername,
            resumeId,
        } = nextProps.app;

        const app = Object.assign({}, {
            firstName,
            lastName,
            age: age ? age.toString() : '',
            gender,
            ethnicity,
            school,
            major,
            gradYear,
            numPrevHackathons: numPrevHackathons ? numPrevHackathons.toString() : '',
            tshirtSize,
            personalWebsite,
            githubUsername,
            resumeId,
            resume: null,
        });

        if (app && app !== this.state.app) {
            this.setState({
                hasApp: true,
                app,
            });
        }
    }

    validateField(validation, value) {
        let highlight = false, message = null;

        if (validation.required && !value) {
            highlight = true;
            message = 'This field is required';
            return {
                highlight,
                message,
            };
        }

        if (validation.validate && !validation.validate.fn.call(this, value)) {
            highlight = true;
            message = validation.validate.message;

            return {
                highlight,
                message,
            };
        }

        if (validation.enum && !validation.enum.includes(value)) {
            highlight = true;
            message = `Must be an acceptable value`;

            return {
                highlight,
                message,
            };
        }

        return {
            highlight,
            message,
        };
    }

    onFormInputChange(key, value) {
        let flags = {};

        if (this.state.app.hasOwnProperty(key) && this.VALIDATIONS.hasOwnProperty(key)) {
            const validation = this.VALIDATIONS[key];

            flags[key] = this.validateField(validation, value);

            if (!isEmpty(flags)) {
                this.setState({
                   errors: {
                       ...this.state.errors,
                       ...flags,
                   },
                });
            }

            let updatedState = {
                app: { ...this.state.app },
                submitted: false,
            };

            updatedState['app'][key] = value;
            this.setState(updatedState);
        }
    }

    isAppValid() {
        return isEqual(this.state.errors, this.DEFAULT_ERRORS);
    }

    isAppCompleted() {
        for (let field in this.state.app) {
            if (!this.state.app[field] && field in this.VALIDATIONS && this.VALIDATIONS[field].required) {
                return false;
            }
        }

        return true;
    }

    isAppReady() {
        return this.isAppValid() && this.isAppCompleted();
    }

    getCompletedAppFields() {
        let app = this.state.app;

        Object.keys(app).forEach(key => {
            const formKey = snakeCase(key);
            app[key] = parseInt(app[key], 10) || app[key];
            
            if (app[key]) {
                if (key === formKey) return;
                Object.defineProperty(app, formKey, Object.getOwnPropertyDescriptor(app, key));
            }

            delete app[key];
        });

        return app;
    }

    onSubmitApp = e => {
        e.preventDefault();

        if (this.isAppValid()) {
            const hasExistingApp = this.state.hasApp;
            const options = this.getCompletedAppFields();
            this.props.updateApp(options).then(() => {
                this.setState({
                    submitted: true
                });

                this.props.displayBanner(
                    `Thanks! Your application has been ${hasExistingApp ? "updated" : "submitted"}!`,
                    5000,
                );
            });
        }
    }

    render() {
        const {
            firstName: firstNameError,
            lastName: lastNameError,
            age: ageError,
            ethnicity: ethnicityError,
            gender: genderError,
            school: schoolError,
            major: majorError,
            gradYear: gradYearError,
            numPrevHackathons: numPrevHackathonsError,
            tshirtSize: tshirtSizeError,
            personalWebsite: personalWebsiteError,
            githubUsername: githubUsernameError,
        } = this.state.errors;

        const {
            submitted,
            ready,
            closed,
            hasApp,
        } = this.state;

        if (!ready) {
            return null;
        }

        if (closed && !hasApp) {
            return <div className="pa4 mw7 center">
                <p className="pt2 karla wh-off-white antialias f1 b">Sorry :/</p>
                <p className="karla wh-off-white antialias f2">Applications have been closed! Please apply next year.</p>
            </div>;
        }
        
        return (
            <div className="app-form pa4 mw7 center">
                <p className="karla wh-off-white antialias f1 b">Application</p>
                <form>
                    <div className="cf mb2">
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">First Name*</label>
                            <FormInput
                                className="app-first-name"
                                value={ this.state.app.firstName }
                                highlight={firstNameError.highlight}
                                memo={firstNameError.message ? firstNameError.message : null}
                                onChange={e => this.onFormInputChange('firstName', e.target.value)}
                            />
                        </div>
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Last Name*</label>
                            <FormInput
                                className="app-last-name"
                                value={ this.state.app.lastName }
                                highlight={lastNameError.highlight}
                                memo={lastNameError.message ? lastNameError.message : null}
                                onChange={e => this.onFormInputChange('lastName', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="cf mb2">
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">School*</label>
                            <FormSelect
                                className="app-school"
                                value={
                                    this.state.app.school
                                    ? { label: this.state.app.school, value: this.state.app.school }
                                    : null
                                }
                                highlight={schoolError.highlight}
                                memo={schoolError.message ? schoolError.message : null}
                                onChange={option => this.onFormInputChange('school', option.value)}
                                options={collegeOptions}
                            />
                        </div>
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Major*</label>
                            <FormInput
                                className="app-major"
                                value={ this.state.app.major }
                                highlight={majorError.highlight}
                                memo={majorError.message ? majorError.message : null}
                                onChange={e => this.onFormInputChange('major', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="cf mb2">
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Graduation Year*</label>
                            <FormSelect
                                className="app-grad-year"
                                value={
                                    this.state.app.gradYear
                                    ? { label: this.state.app.gradYear, value: this.state.app.gradYear }
                                    : null
                                }
                                highlight={gradYearError.highlight}
                                memo={gradYearError.message ? gradYearError.message : null}
                                onChange={option => this.onFormInputChange('gradYear', option.value)}
                                options={gradYearOptions}
                            />
                        </div>
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Age*</label>
                            <FormInput
                                className="app-age"
                                value={ this.state.app.age.toString() }
                                highlight={ageError.highlight}
                                memo={ageError.message ? ageError.message : null}
                                onChange={e => this.onFormInputChange('age', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="cf mb2">
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Number of Previous Hackathons Attended</label>
                            <FormInput
                                className="app-num-prev-hackathons"
                                value={ this.state.app.numPrevHackathons }
                                highlight={numPrevHackathonsError.highlight}
                                memo={numPrevHackathonsError.message ? numPrevHackathonsError.message : null}
                                onChange={e => this.onFormInputChange('numPrevHackathons', e.target.value)}
                            />
                        </div>
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Ethnicity</label>
                            <FormSelect
                                className="app-ethnicity"
                                value={
                                    this.state.app.ethnicity
                                        ? { label: ethnicityMapping[this.state.app.ethnicity], value: this.state.app.ethnicity }
                                        : null
                                }
                                highlight={ethnicityError.highlight}
                                memo={ethnicityError.message ? ethnicityError.message : null}
                                onChange={option => this.onFormInputChange('ethnicity', option.value)}
                                options={ethnicityOptions}
                            />
                        </div>
                    </div>
                    <div className="cf mb2">
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Gender</label>
                            <FormSelect
                                className="app-gender"
                                value={
                                    this.state.app.gender
                                        ? { label: genderMapping[this.state.app.gender], value: this.state.app.gender }
                                        : null
                                }
                                highlight={genderError.highlight}
                                memo={genderError.message ? genderError.message : null}
                                onChange={option => this.onFormInputChange('gender', option.value)}
                                options={genderOptions}
                            />
                        </div>
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">T-Shirt Size*</label>
                            <FormSelect
                                className="app-t-shirt-size"
                                value={
                                    this.state.app.tshirtSize
                                        ? { label: tshirtSizeMapping[this.state.app.tshirtSize], value: this.state.app.tshirtSize }
                                        : null
                                }
                                highlight={tshirtSizeError.highlight}
                                memo={tshirtSizeError.message ? tshirtSizeError.message : null}
                                onChange={option => this.onFormInputChange('tshirtSize', option.value)}
                                options={tshirtSizeOptions}
                            />
                        </div>
                    </div>
                    <div className="cf mb2">
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Personal Website</label>
                            <FormInput
                                className="app-personal-website"
                                value={ this.state.app.personalWebsite }
                                highlight={personalWebsiteError.highlight}
                                memo={personalWebsiteError.message ? personalWebsiteError.message : null}
                                onChange={e => this.onFormInputChange('personalWebsite', e.target.value)}
                            />
                        </div>
                        <div className="fl w-50-ns w-100 pa2">
                            <label className="karla wh-off-white antialias f5 mb2 db">Github Username</label>
                            <FormInput
                                className="app-github-username"
                                value={ this.state.app.githubUsername }
                                highlight={githubUsernameError.highlight}
                                memo={githubUsernameError.message ? githubUsernameError.message : null}
                                onChange={e => this.onFormInputChange('githubUsername', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center pa2 mb2">
                        <label
                            className={`button-reset f5 karla link dim br2 ph4 pv2 dib wh-off-white antialias b--none pointer
                                ${ this.state.app.resume || this.state.app.resumeId ? ' bg-wh-navy' : ' bg-wh-pink'}
                            `}
                            htmlFor="resume"
                        >
                            { this.state.app.resumeId && !this.state.app.resume ?
                                'Resume Submitted'
                                :
                                (this.state.app.resume && this.state.app.resume.name ? this.state.app.resume.name : 'Upload Resume')
                            }
                        </label>
                        <input
                            className="app-resume w-01 h-01 o-0 overflow-hidden absolute z-neg1"
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf,.docx,.doc"
                            onChange={e => this.onFormInputChange('resume', e.target.files[0])} />
                    </div>
                    <div className={`flex justify-end pa2
                        ${this.isAppReady() ? '' : ' pe-none o-50'}
                    `}>
                        <Button
                            className={`mb2 db ${ submitted ? 'pe-none' : ''}`}
                            backgroundColor={ submitted ? 'bg-wh-black' : 'bg-wh-pink' }
                            onClick={ this.onSubmitApp }
                        >
                            { submitted ?
                                'Submitted!'
                                :
                                'Submit'
                            }
                        </Button>
                    </div>
                    <p className="karla white antialias tr f6 mt0">By submitting this application you agree to abide by the <Link className="wh-off-white" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">MLH Code of Conduct.</Link></p>
                </form>
            </div>
        );
    }
}

Application.propTypes = {
    updateApp: PropTypes.func.isRequired,
    displayBanner: PropTypes.func.isRequired,    
    getApp: PropTypes.func.isRequired,
    app: PropTypes.object,
};

export default Application;
