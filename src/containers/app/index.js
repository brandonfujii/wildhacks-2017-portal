import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Logout from 'containers/logout';

const App = (props) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            { !props.isLoggedIn && <Link to={{
                pathname: "/login",
                state: {authType: 'login'}}}>Log in</Link> }
            { !props.isLoggedIn && <Link to={{
                pathname: "/register",
                state: {authType: 'register'}}}>Register</Link>}
            { props.isLoggedIn && <Link to="/logout">Logout</Link> }
        </header>

        <main>
            <Route exact path="/" component={Home}/>
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
