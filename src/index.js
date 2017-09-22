import React from 'react';
import { render } from 'react-dom';
import store from './store';
import AppProvider from './app-provider';
import App from 'containers/app';

const $target = document.getElementById('root');

render(
    <AppProvider store={store}>
         <App />
    </AppProvider>,
    $target,
);