import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Row extends Component {
    renderData() {
        return this.props.columns.map((column, i) => {
            const value = column.accessor(this.props.datum);
            return (
                <td key={i} className={`table-column ${column.id}`}>
                    <p className="karla wh-off-white antialias">{value}</p>
                </td>
            )
        });
    }

    render() {
        return (
            <tr className="table-row">
                { this.renderData() }
            </tr>
        );
    }
}

Row.propTypes = {
    columns: PropTypes.array.isRequired,
    datum: PropTypes.object.isRequired,
};

export default Row;
