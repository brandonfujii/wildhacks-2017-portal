import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthenticationBox from 'components/authentication/authentication-box';
import { 
    register,
    login,
} from 'modules/auth';

const Home = props => (
    <div className="app-view--authentication">
        <AuthenticationBox
            {...props} />
    </div>
);

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
)(Home);
