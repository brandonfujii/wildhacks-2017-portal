import React from 'react';
import { Route, Link } from 'react-router-dom'

import Home from 'containers/home'
import Authentication from 'containers/authentication';

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </header>

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Authentication} />
        </main>
    </div>
);

export default App;
