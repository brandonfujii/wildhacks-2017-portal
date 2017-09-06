import React, { Component } from 'react';
import { Link } from 'components/utility';

export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ready: false };

        const { getApp } = props;
        getApp().then(() => {
            this.setState({
                ready: true
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.isRequestingUpdate;
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
                { app && app.decision && app.decision === 'undecided' &&
                    <div>
                        <p className="karla antialias white f3 lh-copy">Your application is complete!</p>
                        <p className="karla antialias white f3 lh-copy">Join or manage your team membership <Link className="karla antialias white f3 lh-copy" to="/team">here.</Link></p>
                        <p className="karla antialias white f3 lh-copy">Come back later or after you receive an email from us to check your application, and be sure to follow us on <a className="karla white" href="https://www.facebook.com/nuwildhacks/">Facebook</a> for up to date information on application deadlines and announcements.</p>
                    </div>
                }
                { !app &&
                    <div>
                        <p className="karla antialias white f2">Howdy, stranger! Glad you're here. Why not fill out <Link className="karla white" to="/app">this application</Link> so we know a little more about you?</p>
                        <p className="karla antialias white f3 lh-copy">The earlier you fill out the application, the earlier you'll know if you got in.</p>
                    </div>
                }
            </div>
        );
    }
}