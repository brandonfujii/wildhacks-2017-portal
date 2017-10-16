import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardPage from 'components/dashboard';
import { updateApp, getApp, rsvp } from 'modules/application';

const Dashboard = props => {
    return <div className="app-view--dashboard pt4">
        <DashboardPage {...props} />
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
    rsvp,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
