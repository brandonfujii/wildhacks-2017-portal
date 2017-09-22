import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import checkServer from './check-server';

class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { rehydrated: false };
    }

    componentWillMount() {
        const blacklistFilter = createBlacklistFilter(
            'auth',
            ['error'],
        );
        const options = {
            whitelist: ['auth'],
            transforms: [
                blacklistFilter,
            ],
        };

        persistStore(this.props.store, options, () => {
            this.setState({ rehydrated: true });
        });

        if (process.env.NODE_ENV === 'development') checkServer();
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

export default AppProvider;
