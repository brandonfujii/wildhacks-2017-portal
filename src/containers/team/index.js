import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TeamPage from 'components/team';
import { rehydrateUserById } from 'modules/auth';
import { fetchTeamById, fetchTeamByName, joinTeamByName, leaveTeamByName } from 'modules/team';

const Team = props => {
    return (
        <div className="app-view--dashboard pt4">
            <TeamPage {...props} />
        </div>
    );
};

const mapStateToProps = state => ({
    team: state.team.team,
    error: state.team.error,
    isFetchingTeam: state.team.isFetchingTeam,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchTeamById,
    fetchTeamByName,
    joinTeamByName,
    leaveTeamByName,
    rehydrateUserById
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Team);
