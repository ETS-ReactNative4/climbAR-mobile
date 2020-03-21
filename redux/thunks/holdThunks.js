import {setHolds} from '../actions.js';
import axios from 'axios';

export function fetchHolds() {
  return dispatch => {
    return axios
      .get('https://climbar.herokuapp.com/api/holds')
      .then(res => {
        dispatch(setHolds(res.data));
      })
      .catch(e => {
        console.error(e);
      });
  };
}
