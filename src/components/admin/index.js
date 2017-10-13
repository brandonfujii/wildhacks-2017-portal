import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTable from './table';
import { CONFIG } from 'config';

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
                id: 'user-id',
                Header: 'User ID',
                accessor: d => d.id,
            },
            {
                id: 'application-id',
                Header: 'Application ID',
                accessor: d => d.application.id,
            },
            {
                id: 'decision',
                Header: 'Decision',
                accessor: d => d.application.decision,
            },
            {
                id: 'rsvp',
                Header: 'RSVP Status',
                accessor: d => d.application.rsvp,
            },
            {
                id: 'email',
                Header: 'Email',
                accessor: d => d.email,
            },
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
            {
                id: 'school',
                Header: 'School',
                accessor: d => d.application.school,
            },
            {
                id: 'grad-year',
                Header: 'Grad Year',
                accessor: d => d.application.gradYear,
            },
            {
                id: 'resume',
                Header: 'Resume',
                accessor: d => d.application.resume
                    ? <a href={`${CONFIG.DROPBOX_URL}&preview=${d.application.resume.filename}`} target="_blank">Dropbox Link</a>
                    : null,
            },
            {
                id: 't-shirt-size',
                Header: 'Shirt Size',
                accessor: d => d.application.tshirtSize,
            },
            {
                id: 'gender',
                Header: 'Gender',
                accessor: d => d.application.gender,
            },
            {
                id: 'ethnicity',
                Header: 'Ethnicity',
                accessor: d => d.application.ethnicity,
            },
            {
                id: 'num-prev-hackathons',
                Header: 'Number of Previous Hackathons',
                accessor: d => d.application.numPrevHackathons,
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
