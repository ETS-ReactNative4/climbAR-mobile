import {statusMessage} from './../actions';
import {fetchSingleClimbingRoute} from './climbingRoutesThunks';
import {fetchUser} from './UserThunks';
import {getCookie} from '../../utils';
import {FAIL, SUCCESS} from './utils';
import axios from 'axios';

export const uploadRouteVideo = videoData => {
  return dispatch => {
    return axios
      .post('https://climbar.herokuapp.com/api/routevideos', videoData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch(fetchSingleClimbingRoute(res.data.climbingRouteId));
      })
      .then(() => {
        dispatch(fetchUser(getCookie()));
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Video has been uploaded successfully',
          }),
        );
      })
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Cannot upload video',
          }),
        );
      });
  };
};

export const removeRouteVideo = (video, routeId) => {
  return dispatch => {
    return axios
      .delete(`https://climbar.herokuapp.com/api/routevideos/${video.id}`)
      .then(() => {
        dispatch(fetchSingleClimbingRoute(routeId));
      })
      .then(() => {
        dispatch(fetchUser(getCookie()));
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Video has been removed successfully',
          }),
        );
      })
      .catch(e => {
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Cannot remove video',
          }),
        );
      });
  };
};
