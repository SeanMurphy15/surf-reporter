// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 700,
//   },
// });

// class DataTable extends Component {
  
//     constructor(props) {
//         super(props);
//       }
    
//       componentDidMount() {

//       }

//       render() {

//         let tableBody;
//         const { classes } = this.props;
        
//         if (this.props.data !== undefined) {
     
//             tableBody = <TableBody>
//             {this.props.data.map(row => (
//               <TableRow key={row.id}>
//                 <TableCell component="th" scope="row">
//                   {row.properties.name}
//                 </TableCell>
//                 <TableCell>{row.properties.stationIdentifier}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         } 
    
//         return (

//             <div className={classes.root}>
//               <Table className={classes.table}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Station ID</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 {tableBody}
//               </Table>
//             </div>
//           );
//       }
//     }


// DataTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DataTable);

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../components/Search/searchResults.css';
import { getById } from '../actions/viewActions';



import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const columns = [
    { definition: 'project', label: 'Project' },
    { definition: 'company', label: 'Company' },
    { definition: 'projectStartDate', label: 'Start Date' },
    { definition: 'projectEndDate', label: 'End Date (.est)' },
    { definition: 'status', label: 'Status' },
];

class EnhancedTableHead extends React.Component {
   
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columns.map(
                        column => (
                            <TableCell
                                key={column.definition}
                                sortDirection={orderBy === column.definition ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}
                                >
                                    <TableSortLabel hidden={false}
                                        active={orderBy === column.definition}
                                        direction={order}
                                        onClick={this.createSortHandler(column.definition)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class SearchResultsContainer extends React.Component {

    state = {
        order: 'asc',
        orderBy: 'id',
        page: 0,
        rowsPerPage: 10,
        model: "Station"
    };
    
    getById = (id) => {
     //   this.props.getById(id);
    }
    
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {

        var data = this.props.result;
        const { order, orderBy, rowsPerPage, page } = this.state;

        return (
            <Paper className="paper">
                <Table>
            <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
            />
            <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(rowData => {
                        return (
                            <TableRow
                                hover={false}
                                tabIndex={-1}
                                key={rowData.id}
                            >
                                <TableCell component="th" scope="row">
                                <Link onClick={() => this.getById(rowData.id)} to={{ pathname: "/View", state: { item: rowData } }}>
                                    {rowData.project}
                                    </Link>
                                </TableCell>
                                <TableCell>{rowData.company}</TableCell>
                                <TableCell>{new Date(rowData.projectStartDate).toLocaleDateString()}</TableCell>
                                <TableCell>{formatEndDate(rowData)}</TableCell>
                                <TableCell>{mapStatus(rowData.status)}</TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
            </Paper>
        );
    }
}

function formatEndDate(rowData) {

    if (new Date(rowData.projectEndDate) > new Date(rowData.projectStartDate)) {
        return new Date(rowData.projectEndDate).toLocaleDateString();
    }
}

function mapStatus(status) {

    switch (status) {
        case 1:
            return "Incomplete";
        case 2:
            return "Incomplete";
        case 3:
            return "In Progress";
        case 4:
            return "In Progress";
        case 5:
            return "Pending Approval";
        case 6:
            return "Finalized";
        default:
            return "Unknown"
    }
}

function mapStateToProps(state) {
    return {
        result: state.searchResults.result,
        isFetching: state.searchResults.isFetching,
        errorMessage: state.searchResults.errorMessage
    };
}

const mapDispatchToProps = dispatch => ({
    getById: (id) => dispatch(getById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);