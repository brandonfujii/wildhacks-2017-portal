import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './row';
import InfiniteList from 'react-infinite-scroller';

const DashboardLoader = () => (<div className="loader karla white f5 mt4 ml6">Loading users...</div>);

class DataTable extends Component {
    renderColumns() {
        return this.props.columns.map((column, i) => {
            return (
                <th key={i}
                    id={`${column.id}`}
                    className="ba b--moon-gray"
                >
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
                        id={i}
                        columns={columns || []}
                        datum={row}
                        selected={selected} 
                        selectRow={selectRow}
                        deselectRow={deselectRow} />
        });
    }

    render() {
        const { ready } = this.props;
        if (!ready) return <DashboardLoader /> 
        
        return (
            <div className="data-table nowrap overflow-auto">
                <InfiniteList
                    pageStart={1}
                    hasMore={this.props.hasMore}
                    loadMore={this.props.loadMoreUsers}
                    loader={<DashboardLoader/>}
                >
                    <table className="overflow-x-scroll karla w-100">
                        <thead className="ba b--moon-gray">
                            <tr>
                                <th
                                    id="select"
                                    className="ba b--moon-gray"
                                >
                                    Select
                                </th>
                                { this.renderColumns() }
                            </tr>
                        </thead>
                        <tbody className="ba b--moon-gray">
                            { this.renderRows() }
                        </tbody>
                    </table>
                </InfiniteList>
            </div>
        );
    }
}

DataTable.propTypes = {
    ready: PropTypes.bool.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired,
    selectRow: PropTypes.func.isRequired,
    deselectRow: PropTypes.func.isRequired,
};

export default DataTable;
