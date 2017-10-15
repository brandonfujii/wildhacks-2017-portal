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
    fetchingUsers: state.user.fetchingUsersAdmin,
    users: state.user.rows,
    count: state.user.rowCount
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserDataPage,
    judgeApplications,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Admin);
