import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Application from 'containers/application';
import Logout from 'containers/logout';

const renderIfSignedIn = (element, props) => (props.isLoggedIn && element);
const renderIfSignedOut = (element, props) => (!props.isLoggedIn && element);

const App = (props) => (
    <main>
        <Route exact path="/" component={ Home } />
        <Route exact path="/app" component={ Application } />
        <Route exact path="/register" component={ Authentication } />
        <Route exact path="/login" component={ Authentication } />
        <Route exact path="/logout" component={ Logout }/>
    </main>
);

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(
    mapStateToProps,
    null
)(App));
