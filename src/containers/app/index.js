import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import { Button } from 'components/utility';
import Home from 'containers/home';
import Dashboard from 'containers/dashboard';
import Authentication from 'containers/authentication';
import Verify from 'containers/verify';
import ResetPassword from 'containers/reset-password';
import Application from 'containers/application';
import Team from 'containers/team';
import Talk from 'containers/talk';
import Logout from 'containers/logout';
import Admin from 'containers/admin';
import NotFound from 'components/not-found';
import Banner from 'components/banner';
import hideHeaderOnCollision from './hideHeaderOnCollision';

class App extends Component {
    componentDidMount() {
        hideHeaderOnCollision(this.appElement);
    }

    render() {
        const { isLoggedIn, isAdmin, location, bannerText, bannerIsShown } = this.props;

        return (
            <div>
                { bannerText ?
                    <Banner isShown={bannerIsShown}>{ bannerText }</Banner>
                    :
                    null
                }
                <header
                    className={`mw9 pt4 center right-0 fixed
                        ${ location.pathname === '/' ? ' z-max animated o-0' : ''}
                    `}
                    ref={ e => this.appElement = e }
                >
                    <div className="flex pr4-ns">
                        { isLoggedIn && location.pathname === '/dashboard' &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-navy" to="/app">My Application</Button>
                        }
                        { isLoggedIn && location.pathname !== '/dashboard' &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-navy" to="/dashboard">My Dashboard</Button>
                        }
                        { isAdmin && location.pathname !== '/admin' &&
                            <Button className="mh2 f7" backgroundColor="bg-wh-navy" to="/admin">Admin</Button>
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
                    <Switch>
                        <Route exact path="/" render={() => <Home isLoggedIn={ isLoggedIn }/>} />
                        <Route exact path="/dashboard" render={() => isLoggedIn ? <Dashboard/> : <Home/>} />
                        <Route exact path="/app" render={() => isLoggedIn ? <Application/> : <Home/>} />
                        <Route exact path="/team" render={() => isLoggedIn ? <Team/> : <Home/> } />
                        <Route exact path="/talks" render={() => isLoggedIn ? <Talk/> : <Home/> } />
                        <Route exact path="/register" component={ Authentication } />
                        <Route exact path="/login" component={ Authentication } />
                        <Route exact path="/verify/:token" component={props => isLoggedIn ? <Verify verificationToken={props.match.params.token} /> : <Home/>} />
                        <Route exact path="/forgot" component={ ResetPassword } />
                        <Route exact path="/forgot/:token" component={ ResetPassword } />
                        <Route exact path="/admin" component={props => isAdmin ? <Admin {...props} /> : <Home /> } />
                        <Route exact path="/logout" component={ Logout }/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAdmin: state.auth.isAdmin,
        isLoggedIn: state.auth.isLoggedIn,
        bannerText: state.banner.text,
        bannerIsShown: state.banner.isShown,
    }
};

export default withRouter(connect(
    mapStateToProps,
    null
)(App));
