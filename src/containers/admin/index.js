import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUserDataPage } from 'modules/user';
import { judgeApplications, getAcceptCount } from 'modules/application';
import AdminDashboard from 'components/admin';

const Admin = props => (
    <div className="app-view--admin-dashboard">
       <AdminDashboard {...props} />
    </div>
);

const mapStateToProps = state => ({
    fetchingUsers: state.user.fetchingUsersAdmin,
    users: state.user.rows,
    count: state.user.rowCount,
    acceptCount: state.application.acceptCount
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserDataPage,
    judgeApplications,
    getAcceptCount
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Admin);
