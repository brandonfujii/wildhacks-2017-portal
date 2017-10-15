import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Row extends Component {
    renderData() {
        return this.props.columns.map((column, i) => {
            const value = column.accessor(this.props.datum);
            return (
                <td key={i} className={`table-column row-${column.id}`}>
                    <p className="karla wh-off-white antialias">{value || 'N/A'}</p>
                </td>
            )
        });
    }

    handleSelectRow = (applicationId, isChecked) => {
        if (isChecked) {
            this.props.selectRow(applicationId);
        } else {
            this.props.deselectRow(applicationId);
        }
    }

    render() {
        const { application } = this.props.datum;

        return (
            <tr className={`table-row ${ this.props.id % 2 === 0 ? 'bg-wh-navy' : '' } `}>
                <th>
                    <input 
                        type="checkbox" 
                        checked={this.props.selected.has(application.id)}
                        onChange={e => this.handleSelectRow(application.id, e.target.checked)} 
                    />
                </th>
                { this.renderData() }
            </tr>
        );
    }
}

Row.propTypes = {
    columns: PropTypes.array.isRequired,
    datum: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    selectRow: PropTypes.func.isRequired,
    deselectRow: PropTypes.func.isRequired,
};

export default Row;
