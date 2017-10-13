import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './row';

class DataTable extends Component {
    renderColumns() {
        return this.props.columns.map((column, i) => {
            return (
                <th key={i}
                    id={`${column.id}`}>
                    { column.Header }
                </th>
            );
        });
    }


    renderRows() {
        let rows = this.props.data || [];
        return rows.map((row, i) => {
            return <Row key={i}
                        id={`row-${i}`}
                        columns={this.props.columns || []}
                        datum={row} />
        });
    }

    render() {
        return (
            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            { this.renderColumns() }
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderRows() }
                    </tbody>
                </table>
            </div>
        );
    }
}

DataTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
};

export default DataTable;
