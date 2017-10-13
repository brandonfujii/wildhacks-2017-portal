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
            const {
                columns,
                selected,
                selectRow,
                deselectRow,
            } = this.props;

            return <Row key={i}
                        id={`row-${i}`}
                        columns={columns || []}
                        datum={row}
                        selected={selected} 
                        selectRow={selectRow}
                        deselectRow={deselectRow} />
        });
    }

    render() {
        return (
            <div className="data-table nowrap overflow-auto">
                <table className="overflow-x-scroll">
                    <thead>
                        <tr>
                            <th></th>
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
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired,
    selectRow: PropTypes.func.isRequired,
    deselectRow: PropTypes.func.isRequired,
};

export default DataTable;
