import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Button } from 'components/utility'
import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Verify from 'containers/verify';
import ResetPassword from 'containers/reset-password';
import Application from 'containers/application';
import Logout from 'containers/logout';
import hideHeaderOnCollision from './hideHeaderOnCollision';

class App extends Component {
    componentDidMount() {
        hideHeaderOnCollision(this.appElement);
    }

    render() {
        const { isLoggedIn, location } = this.props;

        return (
            <div>
                <header
                    className={`mw9 pt4 center right-0 fixed
                        ${ location.pathname === '/' ? ' z-max animated o-0' : ''}
                    `}
                    ref={ e => this.appElement = e }
                >
                    <div className="flex pr4-ns">
                        { isLoggedIn && location.pathname !== '/app' &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-navy" to="/app">My Application</Button>
                        }
                        { isLoggedIn &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-pink" to={{ pathname: "/logout" }}>Log out</Button>
                        }
                        { !isLoggedIn &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-navy" to={{ pathname: "/login" }}>Log in</Button>
                        }
                        { !isLoggedIn &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-pink" to={{ pathname: "/register" }}>Register</Button>
                        }
                    </div>
                </header>
                <main>
                    <Route exact path="/" render={() => <Home isLoggedIn={ isLoggedIn }/>} />
                    <Route exact path="/app" render={() => <Application isLoggedIn={ isLoggedIn }/>} />
                    <Route exact path="/register" component={ Authentication } />
                    <Route exact path="/login" component={ Authentication } />
                    <Route exact path="/verify/:token" component={Verify} />
                    <Route exact path="/forgot" component={ResetPassword} />
                    <Route exact path="/forgot/:token" component={ResetPassword} />
                    <Route exact path="/logout" component={ Logout }/>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(
    mapStateToProps,
    null
)(App));
