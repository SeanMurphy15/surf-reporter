import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as stationActions from '../actions/stationActions';
import {bindActionCreators} from 'redux';
import DataTable from "../components/DataTable"

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

class StationList extends Component {
 
  componentWillMount() {
        this.props.stationActions.fetchStations();
    }


    render(){
  
        return (    
        <Paper className='paper'>
          <AppBar className='searchBar'position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <SearchIcon className='block' color="inherit" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      className: 'searchInput',
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" className='addUser'>
                    Add user
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton>
                      <RefreshIcon className='block' color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className='contentWrapper'>
                     <DataTable data={this.props.stations}/>
          </div>
        </Paper>);
    }
}

StationList.propTypes = {
    stationActions: PropTypes.object,
    stations: PropTypes.array
};

function mapStateToProps(state) {
    return {
        stations: state.stations
    };
}

function mapDispatchToProps(dispatch) {
    return {
       stationActions: bindActionCreators(stationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StationList);
