import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LogoutPage extends Component {
    componentWillMount() {
        this.props.logout();
        this.props.changePage();
    }

    render() {
        return <div><p>Logging out...</p></div>;
    }
}

LogoutPage.propTypes = {
    logout: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
};

export default LogoutPage;
