import React, { Component } from 'react';

class AdminDashboard extends Component {
    static componentName() {
        return 'AdminDashboard';
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserPage(this.props.auth.token);
    }

    _renderUser() {
        return (this.props.users || []).map(user => {
            return (
                <div key={user.id}>
                    {user.email}
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this._renderUser()}
            </div>
        );
    }
}

export default AdminDashboard;
