import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput, Button, Link } from 'components/utility';

class Team extends Component {
    constructor(props) {
        super(props);
        const { team, user, fetchTeamById } = props

        if (user.teamId) {
            fetchTeamById(user.teamId).then(() => {
                this.setState({
                    newTeam: this.props.team.name,
                    ready: true
                })  
            });
        }

        this.state = {
            newTeam: team ? team.name : '',
            ready: !user.teamId
        };
    }

    onNewTeamChange = (val) => {
        this.setState({
            newTeam: val
        });
    }

    onLeaveTeam = () => {
        const { leaveTeamByName, team, token, user, rehydrateUserById } = this.props;
        leaveTeamByName(team.name).then(() => {
            rehydrateUserById(token, user.id);
        });
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const { joinTeamByName, rehydrateUserById, token, user } = this.props;
        const { newTeam } = this.state;

        if (newTeam) {
            joinTeamByName(newTeam).then(() => {
                rehydrateUserById(token, user.id);
            });
        }
    }

    render() {
        const { team, error } = this.props;
        const { ready, newTeam } = this.state;

        if (!ready) {
            return null;
        }

        return (
            <div className="mw6 center pv6 ph4">
                <h1 className="karla white f2 mb2 antialias">
                    Team
                </h1>
                <p className="karla white f4 antialias">
                    Come up with a unique team name and share it with your friends to join.
                </p>
                { error &&
                    <p className="karla antialias wh-pink mv2">{ error }</p>
                }
                <form
                    onSubmit={ this.onSubmitForm }
                >
                    <FormInput
                        className="mb2"
                        value={ newTeam }
                        onChange={ e => this.onNewTeamChange(e.target.value) }
                    />
                    <Button
                        backgroundColor="bg-wh-pink"
                        onClick={ this.onSubmitForm }
                        className="mb4"
                        type="submit"
                    >
                        Join Team
                    </Button>
                </form>
                { team && 
                    <div>
                        <p className="karla white antialias f4">{`Members of ${team.name}`}</p>
                        { team.users.map((user) => (
                            <p className="karla white antialias f6" key={user.id} >{ user.email }</p>
                        ))}
                        <Link
                            className="karla white antialias"
                            onClick={ this.onLeaveTeam }
                        >
                            {`Leave ${team.name}`}
                        </Link>
                    </div>
                }
                { !team && 
                    <p className="karla white antialias f4">You are not currently in a team</p>
                }
            </div>
        );
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
