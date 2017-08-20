import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LogoutPage from 'components/logout';
import { logout } from 'modules/auth';

const Logout = props => (
    <div className="app-view--logout">
        <LogoutPage
            logout={props.logout}
            changePage={props.changePage} />
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    changePage: () => push('/'),
}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(Logout);
