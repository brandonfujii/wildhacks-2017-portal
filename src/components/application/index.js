import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import snakeCase from 'lodash/snakeCase';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validation from './validation';
import { FormInput, FormSelect, Button } from 'components/utility';

import colleges from './data/colleges.json';
import gradYears from './data/grad-years.json'
import collegeOptions from './data/college-options.json';
import gradYearOptions from './data/grad-year-options.json';

class Application extends Component {
    constructor(props) {
        super(props);

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
                validate: {
                    fn: validation.isString,
                    message: 'Must be a valid string',
                }
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
            }
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
                ethnicity: '',
                school: '',
                major: '',
                gradYear: '',
                numPrevHackathons: '',
                personalWebsite: '',
                githubUsername: '',
                resume: null,
            },
            errors: this.DEFAULT_ERRORS,
            message: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        const {
            firstName,
            lastName,
            age,
            ethnicity,
            school,
            major,
            gradYear,
            numPrevHackathons,
            personalWebsite,
            githubUsername,
            resume,
        } = nextProps.app;

        const app = Object.assign({} , {
            firstName,
            lastName,
            age: age.toString(),
            ethnicity,
            school,
            major,
            gradYear,
            numPrevHackathons,
            personalWebsite,
            githubUsername,
            resume,
        });

        if (app && app !== this.state.app) {
            this.setState({
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
            if (!this.state.app[field]) {
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
            const options = this.getCompletedAppFields();
            this.props.updateApp(options);
        }
    }

    render() {
        const {
            firstName: firstNameError,
            lastName: lastNameError,
            age: ageError,
            ethnicity: ethnicityError,
            school: schoolError,
            major: majorError,
            gradYear: gradYearError,
            numPrevHackathons: numPrevHackathonsError,
            personalWebsite: personalWebsiteError,
            githubUsername: githubUsernameError,
        } = this.state.errors;

        return (
          <div className="app-form pt4">
              <form>
                  <FormInput
                      className="app-first-name"
                      value={ this.state.app.firstName }
                      placeholder="First name"
                      highlight={firstNameError.highlight}
                      memo={firstNameError.message ? firstNameError.message : null}
                      onChange={e => this.onFormInputChange('firstName', e.target.value)}
                  />
                  <FormInput
                      className="app-last-name"
                      value={ this.state.app.lastName }
                      placeholder="Last name"
                      highlight={lastNameError.highlight}
                      memo={lastNameError.message ? lastNameError.message : null}
                      onChange={e => this.onFormInputChange('lastName', e.target.value)}
                  />
                  <FormSelect
                      className="app-school"
                      value={
                          this.state.app.school
                          ? { label: this.state.app.school, value: this.state.app.school }
                          : null
                      }
                      placeholder="School"
                      highlight={schoolError.highlight}
                      memo={schoolError.message ? schoolError.message : null}
                      onChange={option => this.onFormInputChange('school', option.value)}
                      options={collegeOptions}
                  />
                  <FormInput
                      className="app-major"
                      value={ this.state.app.major }
                      placeholder="Major"
                      highlight={majorError.highlight}
                      memo={majorError.message ? majorError.message : null}
                      onChange={e => this.onFormInputChange('major', e.target.value)}
                  />
                  <FormSelect
                      className="app-grad-year"
                      value={
                          this.state.app.gradYear
                          ? { label: this.state.app.gradYear, value: this.state.app.gradYear }
                          : null
                      }
                      placeholder="Expected Graduation Year"
                      highlight={gradYearError.highlight}
                      memo={gradYearError.message ? gradYearError.message : null}
                      onChange={option => this.onFormInputChange('gradYear', option.value)}
                      options={gradYearOptions}
                  />
                  <FormInput
                      className="app-age"
                      value={ this.state.app.age }
                      placeholder="Age"
                      highlight={ageError.highlight}
                      memo={ageError.message ? ageError.message : null}
                      onChange={e => this.onFormInputChange('age', e.target.value)}
                  />
                  <FormInput
                      className="app-ethnicity"
                      value={ this.state.app.ethnicity }
                      placeholder="Ethnicity"
                      highlight={ethnicityError.highlight}
                      memo={ethnicityError.message ? ethnicityError.message : null}
                      onChange={e => this.onFormInputChange('ethnicity', e.target.value)}
                  />
                  <FormInput
                      className="app-num-prev-hackathons"
                      value={ this.state.app.numPrevHackathons }
                      placeholder="Number of previous hackathons"
                      highlight={numPrevHackathonsError.highlight}
                      memo={numPrevHackathonsError.message ? numPrevHackathonsError.message : null}
                      onChange={e => this.onFormInputChange('numPrevHackathons', e.target.value)}
                  />
                  <FormInput
                      className="app-personal-website"
                      value={ this.state.app.personalWebsite }
                      placeholder="https://"
                      highlight={personalWebsiteError.highlight}
                      memo={personalWebsiteError.message ? personalWebsiteError.message : null}
                      onChange={e => this.onFormInputChange('personalWebsite', e.target.value)}
                  />
                  <FormInput
                      className="app-github-username"
                      value={ this.state.app.githubUsername }
                      placeholder="Github username"
                      highlight={githubUsernameError.highlight}
                      memo={githubUsernameError.message ? githubUsernameError.message : null}
                      onChange={e => this.onFormInputChange('githubUsername', e.target.value)}
                  />
                  <input
                      className="app-resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={e => this.onFormInputChange('resume', e.target.files[0])} />
                  <Button
                      backgroundColor="bg-wh-pink"
                      onClick={ this.onSubmitApp }
                      className="mb4">
                      { this.isAppReady() ? "Submit" : "Save" }
                  </Button>
              </form>
          </div>
        );
    }
}

Application.propTypes = {
    updateApp: PropTypes.func.isRequired,
    getApp: PropTypes.func.isRequired,
    app: PropTypes.object,
};

export default Application;
