import React, { Component } from 'react';

export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        const { getApp } = props;
        getApp()
    }

    render() {
        const { app } = this.props;

        return (
            <div className="pa4 mw7 center">
                <p className="karla wh-off-white antialias f1 b">Dashboard</p>
                { app && app.firstName &&
                    <p className="karla antialias white f2">{`Welcome back, ${app.firstName}.`}</p>
                }
                { app && app.decision && app.decision === 'undecided' &&
                    <p className="karla antialias white f2">We haven't made a decision on your application yet. Come back later or after you receive an email from us to check your application.</p>
                }
                { !app &&
                    <p className="karla antialias white f2">Howdy, stranger! Glad you're here. Why not fill out this application so we know a little more about you?</p>
                }
            </div>
        );
    }
}