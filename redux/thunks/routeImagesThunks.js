import {setRouteImage, statusMessage} from './../actions';
import {FAIL, SUCCESS} from './utils';
import axios from 'axios';

export const uploadRouteImage = file => {
  return dispatch => {
    return axios
      .post('https://climbar.herokuapp.com/api/routeimages', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch(setRouteImage(res.data));
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Image has been uploaded successfully',
          }),
        );
      })
      .catch(e => {
        console.error(e);
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Cannot upload the following image',
          }),
        );
      });
  };
};
