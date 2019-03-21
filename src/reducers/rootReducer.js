
import {combineReducers} from 'redux';
import users from './userReducer';
import location from './locationReducer';
import stations from './stationReducer';

const rootReducer = combineReducers({
  users,
  location,
  stations
});

export default rootReducer;