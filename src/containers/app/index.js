import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Button } from 'components/utility'
import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Application from 'containers/application';
import Logout from 'containers/logout';

const renderIfSignedIn = (element, props) => (props.isLoggedIn && element);
const renderIfSignedOut = (element, props) => (!props.isLoggedIn && element);

const App = (props) => (
    <div>
        <header className="mw9 center right-0 left-0 fixed flex items-center justify-between z-max">
            <Link to="/">
                <img className="mw3 mw4-ns mh2 mh3-ns" src="assets/logo.png"></img>
            </Link>
            <div className="flex pr4-ns">
                { renderIfSignedIn(<Button className="mh2 f7" backgroundColor="bg-wh-pink" to="/app">My Application</Button>, props) }
                { renderIfSignedOut(<Button className="mh2 f7" backgroundColor="bg-wh-navy" to={{ pathname: "/login" }}>Log in</Button>, props) }
                { renderIfSignedOut(<Button className="mh2 f7" backgroundColor="bg-wh-pink" to={{ pathname: "/register" }}>Register</Button>, props) }
                { renderIfSignedIn(<Button className="mh2 f7" backgroundColor="bg-wh-pink" to={{ pathname: "/logout" }}>Log out</Button>, props) }
            </div>
        </header>
        <main>
            <Route exact path="/" component={ Home } />
            <Route exact path="/app" component={ Application } />
            <Route exact path="/register" component={ Authentication } />
            <Route exact path="/login" component={ Authentication } />
            <Route exact path="/logout" component={ Logout }/>
        </main>
    </div>
);

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(
    mapStateToProps,
    null
)(App));
