import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import App from './containers/app';

const $target = document.getElementById('root');

class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { rehydrated: false };
    }

    componentWillMount() {
        const options = {
            whitelist: ['auth'],
        };

        persistStore(this.props.store, options, () => {
            this.setState({ rehydrated: true });
        });
    }

    render() {
        if (!this.state.rehydrated) {
            return null;
        }

        return (
            <Provider store={this.props.store}>
                <ConnectedRouter history={history}>
                    {this.props.children}
                </ConnectedRouter>
            </Provider>
        );
    }
}

AppProvider.propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node
};

render(
    <AppProvider store={store}>
         <App />
    </AppProvider>,
    $target,
);