import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectOptions extends Component {
    render() {
        const { selected } = this.props;
        const numSelected = selected.size;
        
        if (numSelected > 0) {
            return (
                <div className="select-options">
                    <p>{ `${numSelected} selected` }</p>
                    <button>Accept</button>
                    <button>Waitlist</button>
                    <button>Reject</button>
                </div>
            );
        }

        return null;
    }
}

SelectOptions.propTypes = {
    selected: PropTypes.object.isRequired,
};

export default SelectOptions;
