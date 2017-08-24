import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Registration from 'components/authentication/registration';
import Login from 'components/authentication/login';
import { 
    register,
    login,
} from 'modules/auth';

const Authentication = props => {
    const { pathname } = props.location;

    return <div className="app-view--authentication">
        { pathname === '/register' && <Registration register={props.register} /> }
        { pathname === '/login' && <Login login={props.login} /> }
    </div>
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    isRequestingAuth: state.auth.isRequestingAuth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    register,
    login,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Authentication);
