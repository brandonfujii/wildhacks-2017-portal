import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: {},
        };
    }

    render() {
        return (
          <div></div>
        );
    }
}

Application.propTypes = {
    updateApp: PropTypes.func.isRequired,
    app: PropTypes.object,
};

export default Application;
