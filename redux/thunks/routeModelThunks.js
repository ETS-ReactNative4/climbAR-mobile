import {
  setHold,
  setRouteModels,
  statusMessage,
  setDraggingHold,
  setEditModel,
  setHolds,
} from '../actions.js';
import axios from 'axios';
import {FAIL, SUCCESS} from './utils';
import {fetchSingleClimbingRoute} from './climbingRoutesThunks';

//put the updated route on the server
export function editRouteModel(model) {
  return dispatch => {
    return axios
      .put('https://climbar.herokuapp.com/api/routemodels/edit', model)
      .then(() => {
        dispatch(fetchRouteModels());
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Route Edited',
          }),
        );
      })
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Cannot Edit Route',
          }),
        );
      });
  };
}

//set the route model for editing
export function editModel(model) {
  return dispatch => {
    axios
      .get('https://climbar.herokuapp.com/api/holds')
      .then(res => {
        dispatch(setHolds(res.data));
        dispatch(setEditModel(model, res.data));
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export function setNewHold(hold) {
  return dispatch => dispatch(setHold(hold));
}

export function setNewDraggingHold(hold) {
  return dispatch => dispatch(setDraggingHold(hold));
}

export function createRouteModel(model) {
  return dispatch => {
    return axios
      .post('https://climbar.herokuapp.com/api/routemodels/new', model)
      .then(res => {
        dispatch(fetchSingleClimbingRoute(res.data.id));
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Route Created',
          }),
        );
      })
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Cannot create route ',
          }),
        );
      });
  };
}

export function fetchRouteModels() {
  return dispatch => {
    return axios
      .get('https://climbar.herokuapp.com/api/routemodels')
      .then(res => {
        dispatch(setRouteModels(res.data));
      })
      .catch(e => {});
  };
}
