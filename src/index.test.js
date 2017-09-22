import React from 'react';
import { shallow } from 'enzyme';
import store from './store';
import AppProvider from './app-provider';
import App from 'containers/app';

it('app provider renders without crashing', () => {
    shallow(
        <AppProvider store={store}>
            <App />
        </AppProvider>
    );
});