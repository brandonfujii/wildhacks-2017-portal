import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectOptions extends Component {
    waitlistApps = () => {
        const selectedAppIds = Array.from(this.props.selected || []);
        this.props.judgeApps("waitlisted", selectedAppIds);
    }

    acceptApps = () => {
        const selectedAppIds = Array.from(this.props.selected || []);
        console.log(selectedAppIds);
        this.props.judgeApps("accepted", selectedAppIds);
    }

    rejectApps = () => {
        const selectedAppIds = Array.from(this.props.selected || []);
        this.props.judgeApps("rejected", selectedAppIds);
    }

    render() {
        const { selected } = this.props;
        const numSelected = selected.size;
        
        if (numSelected > 0) {
            return (
                <div className="select-options">
                    <p>{ `${numSelected} selected` }</p>
                    <button onClick={this.acceptApps}>Accept</button>
                    <button onClick={this.waitlistApps}>Waitlist</button>
                    <button onClick={this.rejectApps}>Reject</button>
                </div>
            );
        }

        return null;
    }
}

SelectOptions.propTypes = {
    selected: PropTypes.object.isRequired,
    judgeApps: PropTypes.func.isRequired,
};

export default SelectOptions;
