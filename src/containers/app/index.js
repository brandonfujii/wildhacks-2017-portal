import React from 'react';
import { connect } from 'react-redux';
import {
    withRouter,
    Route,
    Link } from 'react-router-dom';

import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Logout from 'containers/logout';

const renderIfSignedIn = (element, props) => (props.isLoggedIn && element);
const renderIfSignedOut = (element, props) => (!props.isLoggedIn && element);

const App = (props) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            { renderIfSignedOut(<Link to={{ pathname: "/login" }}>Log in</Link>, props) }
            { renderIfSignedOut(<Link to={{ pathname: "/register" }}>Register</Link>, props) }
            { renderIfSignedIn(<Link to={{ pathname: "/logout" }}>Log out</Link>, props) }
        </header>

        <main>
            <Route exact path="/" component={ Home } />
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
