import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Button } from 'components/utility';

export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            showRsvp: true,
            appClosed: true,
        };

        const { getApp } = props;
        getApp().then(() => {
            this.setState({
                ready: true,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.app) {
            const nextApp = nextProps.app;
            if (nextApp.rsvp !== 'undecided') {
                this.hideRsvp();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.isRequestingUpdate;
    }
    
    rsvpIfAccepted = async status => {
        const { app, getApp, rsvp } = this.props;
        if (app && app.decision === 'accepted' && (status === 'yes' || status === 'no')) {
            await rsvp(status);
            await getApp();
            this.hideRsvp();
        }
    }

    hideRsvp = () => {
        this.setState({
            showRsvp: false,
        });
    }

    showRsvp = () => {
        this.setState({
            showRsvp: true,
        });
    }

    toggleRsvp = () => {
        this.setState({
            showRsvp: !this.state.showRsvp,
        });
    }

    render() {
        const { app } = this.props;
        const { ready } = this.state;

        if (!ready) {
            return null;
        }

        return (
            <div className="pa4 mw7 center">
                <p className="karla wh-off-white antialias f1 b">Dashboard</p>
                { app && app.firstName &&
                    <p className="karla antialias white f2">{`Welcome back, ${app.firstName}.`}</p>
                }
                { app && app.decision && app.decision === "waitlisted" &&
                    <div>
                        <p className="karla antialias white f3 lh-copy">
                            Thank you for applying to WildHacks 2017. You have been placed on the waitlist for the event. We will let you know if you have been taken off the waitlist by Monday, October 23rd.
                        </p>
                        <p className="karla antialias white f3 lh-copy">Join or manage your team membership <Link className="karla antialias white f3 lh-copy" to="/team">here.</Link></p>
                        <p className="karla antialias white f3 lh-copy">View, submit, or vote on talks <Link className="karla antialias white f3 lh-copy" to="/talks">here.</Link></p>
                    </div>
                }
                { app && app.decision && app.decision === "rejected" &&
                    <p className="karla antialias white f3 lh-copy">
                        Thank you for applying. Unfortunately, you have not been accepted to WildHacks 2017. We received a record number of highly qualified applicants and sadly could not accept everyone. We hope that you will apply for WildHacks next year!
                    </p>
                }
                { app && app.decision && app.decision === "accepted" &&
                    <div>
                        <p className="karla antialias white f3 lh-copy">Congrats! You're in! To let us know that you’re coming, please RSVP below by Monday, October 23 at 11:59 PM CST</p>
                        { app && app.rsvp !== 'undecided' &&
                            <p>
                                <span className="karla antialias white f3 lh-copy">
                                    { `You RSVP\'d ${app.rsvp.toUpperCase()}` }
                                </span>
                                <Link
                                    className="karla white f5 ml2"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.toggleRsvp();
                                    }}
                                >
                                    { `${ !this.state.showRsvp ? "Update RSVP status" : "Hide RSVP options" }` }
                                </Link> 
                            </p>
                        }
                        { this.state.showRsvp && 
                            <div>
                                <Button
                                    backgroundColor="bg-wh-pink"
                                    className="mr2"
                                    onClick={ this.rsvpIfAccepted.bind(this, "yes") }
                                >
                                    I can go!
                                </Button>
                                <Button
                                    backgroundColor="bg-wh-pink"
                                    onClick={ this.rsvpIfAccepted.bind(this, "no") }
                                >
                                    I can't make it
                                </Button>
                            </div>
                        }
                        <p className="karla antialias white f3 lh-copy">Join or manage your team membership <Link className="karla antialias white f3 lh-copy" to="/team">here.</Link></p>
                        <p className="karla antialias white f3 lh-copy">View, submit, or vote on talks <Link className="karla antialias white f3 lh-copy" to="/talks">here.</Link></p>
                    </div>
                }
                { app && app.decision && app.decision === 'undecided' &&
                    <div>
                        <p className="karla antialias white f3 lh-copy">Your application is complete!</p>
                        <p className="karla antialias white f3 lh-copy">Join or manage your team membership <Link className="karla antialias white f3 lh-copy" to="/team">here.</Link></p>
                        <p className="karla antialias white f3 lh-copy">View, submit, or vote on talks <Link className="karla antialias white f3 lh-copy" to="/talks">here.</Link></p>
                        <p className="karla antialias white f3 lh-copy">Come back later or after you receive an email from us to check your application, and be sure to follow us on <a className="karla white" href="https://www.facebook.com/nuwildhacks/">Facebook</a> for up to date information on application deadlines and announcements.</p>
                    </div>
                }
                { !app && this.state.appClosed &&
                    <div>
                        <p className="karla antialias white f2">Howdy, stranger! Apps are closed!</p>
                        <p className="karla antialias white f3 lh-copy">Please be sure to apply next year! Be sure to follow us on <a className="karla white" href="https://www.facebook.com/nuwildhacks/">Facebook</a> for up to date information on application deadlines and announcements.</p>
                    </div>
                }
                { !app && !this.state.appClosed && 
                    <div>
                        <p className="karla antialias white f2">Howdy, stranger! Glad you're here. Why not fill out <Link className="karla white" to="/app">this application</Link> so we know a little more about you?</p>
                        <p className="karla antialias white f3 lh-copy">The earlier you fill out the application, the earlier you'll know if you got in.</p>
                    </div>
                }
            </div>
        );
    }
}

DashboardPage.propTypes = {
    app: PropTypes.object,    
    rsvp: PropTypes.func.isRequired,
    getApp: PropTypes.func.isRequired,
};