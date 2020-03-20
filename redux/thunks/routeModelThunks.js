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
    console.log('sending model to server for editing');
    console.log(model);
    return axios
      .put('/api/routemodels/edit', model)
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
      .get(`/api/holds`)
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
      .post(`/api/routemodels/new`, model)
      .then(res => {
        console.log('this the response', res);
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
      .get(`api/routemodels`)
      .then(res => {
        dispatch(setRouteModels(res.data));
      })
      .catch(e => {});
  };
}
