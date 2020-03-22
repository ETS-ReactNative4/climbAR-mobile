import {setClimbingRoutes, setClimbingRoute, setRouteFilters} from '../actions';
import axios from 'axios';

export const fetchClimbingRoutes = () => {
  return dispatch => {
    return axios
      .get('https://climbar.herokuapp.com/api/climbingroutes')
      .then(res => {
        dispatch(setClimbingRoutes(res.data));
      })
      .catch(e => console.error(e));
  };
};

export const fetchSingleClimbingRoute = id => {
  return dispatch => {
    axios
      .get(`https://climbar.herokuapp.com/api/climbingroutes/${id}`)
      .then(res => dispatch(setClimbingRoute(res.data)))
      .catch(e => console.error(e));
  };
};

export const dispatchRouteFilters = filters => {
  return dispatch => {
    dispatch(setRouteFilters(filters));
  };
};
