import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ApplicationPage from 'components/application';
import { updateApp, getApp } from 'modules/application';

const Application = props => {
    if (!props.isLoggedIn) {
        return <Redirect to="/" />;
    }

    return <div className="app-view--application pt4">
        <ApplicationPage {...props} />
    </div>;
};

const mapStateToProps = state => ({
    app: state.application.app,
    error: state.application.error,
    isRequestingUpdate: state.application.isRequestingUpdate,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateApp,
    getApp,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Application);
