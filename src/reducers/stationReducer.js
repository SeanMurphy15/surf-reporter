import initialState from './initialState';
import {FETCH_STATIONS, RECEIVE_STATIONS} from '../actions/actionTypes';

export default function stations(state = initialState.stations, action) {
  let newState;
  switch (action.type) {
    case FETCH_STATIONS:
      console.log('FETCH_STATIONS Action')
      return action;
    case RECEIVE_STATIONS:
      newState = action.stations;
      console.log('RECEIVE_STATIONS Action')
      return newState;
    default:
      return state;
  }
}