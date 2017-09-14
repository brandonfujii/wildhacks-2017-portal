import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller'
import { FormInput, Button } from 'components/utility';
import Talks from './talks';

class Talk extends Component {
    constructor(props) {
        super(props);

        const { fetchTalks } = props;
        
        fetchTalks(1, 5)
            .then(() => {
                this.setState({
                    ready: true
                }); 
            })
            .catch(err => {
                console.log(err);
            });

        this.state = {
            ready: false,
        };
    }

    // onNewTeamChange = (val) => {
    //     this.setState({
    //         newTeam: val
    //     });
    // }

    // onLeaveTeam = async () => {
    //     const { leaveTeamByName, team, user, rehydrateUserById } = this.props;
    //     await leaveTeamByName(team.name);
    //     rehydrateUserById(user.id);
    // }

    // onSubmitForm = async (e) => {
    //     e.preventDefault();
    //     const { joinTeamByName, fetchTeamById, rehydrateUserById, user } = this.props;
    //     const { newTeam } = this.state;

    //     if (newTeam) {
    //         await joinTeamByName(newTeam)
    //         await rehydrateUserById(user.id);
    //         if (this.props.user.teamId && this.props.user.teamId !== this.props.team.id) {
    //             fetchTeamById(this.props.user.teamId);
    //         }
    //     }
    // }

    render() {
        const { talk, error } = this.props;
        const { ready } = this.state;

        if (!ready) {
            return null;
        }

        return (
            <div className="mw6 center pv6 ph4">
                <h1 className="karla white f2 mb2 antialias">
                    Lightning Talks
                </h1>
                <p className="karla white f4 antialias">
                    Present a lightning talk at WildHacks
                </p>
                { error &&
                    <p className="karla antialias wh-pink mv2">{ error }</p>
                }
                <form
                    onSubmit={() => {}}
                >
                    <FormInput
                        className="mb2"
                        value={''}
                        placeholder="Talk name"
                        onChange={() => {}}
                    />
                    <Button
                        backgroundColor="bg-wh-pink"
                        onClick={() => {}}
                        className="mb4"
                        type="submit"
                    >
                        Submit Talk
                    </Button>
                </form>
                <Talks talks={this.props.talks} />
            </div>
        );
    }
}

Talk.propTypes = {
    fetchTalkById: PropTypes.func.isRequired,
    fetchTalks: PropTypes.func.isRequired,
    talk: PropTypes.object,
    talks: PropTypes.array,
    error: PropTypes.string,
};

export default Talk;
