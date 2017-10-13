import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUserDataPage } from 'modules/user';
import { judgeApplications } from 'modules/application';
import AdminDashboard from 'components/admin';

const Admin = props => (
    <div className="app-view--admin-dashboard">
       <AdminDashboard {...props} />
    </div>
);

const mapStateToProps = state => ({
    fetchingUsers: state.user.fetchingUsers,
    users: state.user.users,
    page: state.user.page,
    pageSize: state.user.pageSize,
    totalPages: state.user.totalPages,
    totalUsers: state.user.totalUsers
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserDataPage,
    judgeApplications,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Admin);
