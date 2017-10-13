import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTable from './table';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.props.getUserDataPage().then(() => {
            this.setState({ ready: true });
        })

        this.state = {
            ready: false,
        };
    }

    render() {
        const columns = [
            {
                id: 'first-name',
                Header: 'First Name',
                accessor: d => d.application.firstName,
            },
            {
                id: 'last-name',
                Header: 'Last Name',
                accessor: d => d.application.lastName,
            },
        ];

        return ( 
            <div className="data-table-wrapper pt5 wh-off-white">
                <DataTable 
                    columns={columns || []} 
                    data={this.props.users || []} 
                />
            </div>
        );
    }
};

AdminDashboard.propTypes = {
    fetchingUsers: PropTypes.bool,
    users: PropTypes.array,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    totalPages: PropTypes.number,
    totalUsers: PropTypes.number,
    getUserDataPage: PropTypes.func.isRequired,
};

export default AdminDashboard;
