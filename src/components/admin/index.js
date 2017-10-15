import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTable from './table';
import SelectOptions from './select-options';
import { CONFIG } from 'config';

const pageSize = 5;

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.props.getUserDataPage(1, pageSize).then(() => {
            this.setState({ ready: true });
        })

        this.state = {
            ready: false,
            selected: new Set(),
            users: [],
            hasMore: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users && !this.hasDuplicates(nextProps.users, this.state.users.slice())) {
            const users = this.state.users.concat(nextProps.users);
            this.setState({
                users,
                hasMore: nextProps.count > users.length,
            });
        }
    }

    loadMoreUsers = async (page) => {
        try {
            await this.props.getUserDataPage(page, pageSize);
        } catch (err) {
            this.setState({
                error: err.message,
            });
        }
    }

    hasDuplicates = (subset = [], superset = []) => {
        if (subset.length < 1 || superset.length < 1) return false;

        let hasDuplicate = false;
        subset = new Set(subset.map(user => user.id));

        for (let i = 0, len = superset.length; i < len; ++i) {
            if (subset.has(superset[i].id)) {
                hasDuplicate = true;
                break;
            }
        }

        return hasDuplicate;
    }

    judgeApps = (decision, applicationIds = []) => {
        if (["accepted", "waitlisted", "rejected"].indexOf(decision) > -1) {
            this.props.judgeApplications(decision, applicationIds);
        }
    }

    selectRow = applicationId => {
        let selected = this.state.selected;

        if (!selected.has(applicationId)) {
            selected.add(applicationId);
            this.setState({
                selected,
            });
        }
    }

    deselectRow = applicationId => {
        let selected = this.state.selected;
        
        if (selected.has(applicationId)) {
            selected.delete(applicationId);
            this.setState({
                selected,
            });
        }
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
                id: 'github',
                Header: 'Github',
                accessor: d => d.application.githubUsername,
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
            <div className="data-table-wrapper pt6 wh-off-white">
                <SelectOptions 
                    selected={this.state.selected}
                    judgeApps={this.judgeApps}
                />
                <DataTable
                    ready={this.state.ready}
                    columns={columns || []} 
                    data={this.state.users} 
                    selected={this.state.selected}
                    selectRow={this.selectRow}
                    deselectRow={this.deselectRow}
                    loadMoreUsers={ this.loadMoreUsers }
                    hasMore={ this.state.hasMore }
                />
            </div>
        );
    }
};

AdminDashboard.propTypes = {
    fetchingUsers: PropTypes.bool,
    users: PropTypes.array,
    count: PropTypes.number,
    getUserDataPage: PropTypes.func.isRequired,
    judgeApplications: PropTypes.func.isRequired,
};

export default AdminDashboard;
