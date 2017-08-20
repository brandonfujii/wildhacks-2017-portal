import React from 'react';
import { connect } from 'react-redux';
import {
    withRouter,
    Route,
    Link,
    Redirect } from 'react-router-dom';

import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Logout from 'containers/logout';

const App = (props) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            { !props.isLoggedIn && <Link to={{ pathname: "/login" }}>Log in</Link> }
            { !props.isLoggedIn && <Link to={{ pathname: "/register" }}>Register</Link>}
            { props.isLoggedIn && <Link to="/logout">Logout</Link> }
        </header>

        <main>
            <Route exact path="/"
                   render={routeProps => (
                       props.isLoggedIn
                           ? (React.createElement(Home, props))
                           : <Redirect to={{
                           pathname: "/login",
                           state: {
                               from: routeProps.location,
                           }}} />
                   )} />
            <Route exact path="/register" component={Authentication} />
            <Route exact path="/login" component={Authentication} authType="login" />
            <Route exact path="/logout" component={Logout}/>
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
