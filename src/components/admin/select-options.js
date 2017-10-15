import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/utility';

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
        
        return (
            <div className={`select-options flex justify-end items-center mb2 ${ numSelected > 0 ? '' : 'o-50 pointer-events-none' }`}>
                <span className="karla antialias">{ `${numSelected} selected` }</span>
                <Button onClick={ this.acceptApps } backgroundColor="bg-green" className="f6 f5-ns mh2">
                    Accept
                </Button>
                <Button onClick={ this.waitlistApps } backgroundColor="bg-orange" className="f6 f5-ns mh2">
                    Waitlist
                </Button>
                <Button onClick={ this.rejectApps } backgroundColor="bg-red" className="f6 f5-ns mh2">
                    Reject
                </Button>
            </div>
        );

        return null;
    }
}

SelectOptions.propTypes = {
    selected: PropTypes.object.isRequired,
    judgeApps: PropTypes.func.isRequired,
};

export default SelectOptions;
