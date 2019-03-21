import initialState from './initialState';
import {FETCH_LOCATION, RECEIVE_LOCATION} from '../actions/actionTypes';

export default function location(state = initialState.location, action) {
  let newState;
  switch (action.type) {
    case FETCH_LOCATION:
      console.log('FETCH_LOCATION Action')
      return action;
    case RECEIVE_LOCATION:
      newState = action.location;
      console.log('RECEIVE_LOCATION Action')
      return newState;
    default:
      return state;
  }
}