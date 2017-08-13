import React, { Component } from 'react';
import AuthenticationBox from './AuthenticationBox';

const VALID_LOGIN_TYPES = ['login', 'register'];

class AuthenticationPage extends Component {
    static componentName() {
        return 'AuthenticationPageComponent';
    }

    constructor(props) {
        super(props);

        this.state = {
            loginType: 'register',
        };
    }

    changeLoginType(loginType) {
        if (VALID_LOGIN_TYPES.contains(loginType)) {
            this.setState({
                loginType,
            });
        }
    }

    render() {
        return (
            <div className="app-view--authentication">
                <AuthenticationBox 
                    loginType={this.state.loginType} 
                    changeLoginType={this.changeLoginType.bind(this)} />
            </div>
        );
    }
}

export default AuthenticationPage;