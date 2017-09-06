import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Team extends Component {
    constructor(props) {
        super(props);

        this.props.fetchTeamByName('icarly');
    }

    render() {
        return (<div></div>);
    }
}


Team.propTypes = {
    fetchTeamById: PropTypes.func.isRequired,
    fetchTeamByName: PropTypes.func.isRequired,
    joinTeamByName: PropTypes.func.isRequired,
    leaveTeamByName: PropTypes.func.isRequired,
    team: PropTypes.object,
    error: PropTypes.string,
};

export default Team;
