import React from 'react';
import { Route, Link } from 'react-router-dom'

import Home from 'containers/home'
import Authentication from 'containers/authentication';
import Admin from 'containers/admin';

const App = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Authentication} />
        <Route exact path="/admin" component={Admin} />
    </div>
);

export default App;
