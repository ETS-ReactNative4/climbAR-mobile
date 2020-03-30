import axios from 'axios';
import {
  setUser,
  statusMessage,
  logInSuccess,
  loggedInFail,
  getToken,
  saveToken,
  removeToken,
  tokenError,
} from '../actions';
import {FAIL, SUCCESS} from './utils';
import chalk from 'chalk';
import {getCookie} from '../../utils';
import {fetchClimbingRoutes} from './climbingRoutesThunks';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchUser = sessionId => {
  return dispatch => {
    return axios
      .get(`https://climbar.herokuapp.com/api/users/session/${sessionId}`)
      .then(res => {
        console.log(chalk.cyan('returned value from get api', res.data));
        const {user, completedRouteInfo} = res.data;
        user['completedRouteInfo'] = completedRouteInfo;
        dispatch(setUser(user));
      })
      .catch(e => {
        console.log(chalk.cyan('error setting the user', e));
        switch (e.response.status) {
          case 404:
            dispatch(setUser({}));
            return;
          default:
            dispatch(setUser({}));
            dispatch(
              statusMessage({
                status: FAIL,
                text: 'Error fetching the user',
              }),
            );
            return;
        }
      });
  };
};

export const logInUser = ({email, password}) => {
  return function thunk(dispatch) {
    return axios
      .post('https://climbar.herokuapp.com/api/users/login', {email, password})
      .then(res => {
        const {user, completedRouteInfo} = res.data;
        user['completedRouteInfo'] = completedRouteInfo;
        dispatch(setUser(user));
        dispatch(logInSuccess());
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Logged in successfully',
          }),
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(loggedInFail());
        dispatch(
          statusMessage({
            status: FAIL,
            text: 'Invalid email address or password. Please try again.',
          }),
        );
      });
  };
};

// Thunk for creating a user
export const createUser = ({email, password}) => {
  const req = {
    email,
    password,
    userType: 'Climber',
  };
  return dispatch => {
    return axios
      .post('https://climbar.herokuapp.com/api/users', req)
      .then(res => {
        dispatch(setUser(res.data));
      })
      .catch(e => {
        console.warn(e);
      });
  };
};

export const logoutUser = userId => {
  return function thunk(dispatch) {
    return axios
      .post(`https://climbar.herokuapp.com/api/users/logout/${userId}`)
      .then(res => {
        console.log(res.data);
        dispatch(setUser(res.data));
      })
      .then(() => {
        dispatch(
          statusMessage({
            status: SUCCESS,
            text: 'Logged out successfully',
          }),
        );
      })
      .catch(err => {
        console.log('Error logging user out', err);
      });
  };
};

export const likeRoute = (user, route) => {
  return function thunk(dispatch) {
    return axios
      .post('https://climbar.herokuapp.com/api/users/routes/like', {
        user,
        route,
      })
      .then(res => {
        dispatch(fetchUser(getCookie()));
        dispatch(fetchClimbingRoutes());
      })
      .catch(err => {
        console.log('Error liking a route ', err);
      });
  };
};

export const unLikeRoute = (user, route) => {
  return function thunk(dispatch) {
    return axios
      .delete('https://climbar.herokuapp.com/api/users/routes/unlike', {
        data: {user, route},
      })
      .then(() => {
        dispatch(fetchUser(getCookie()));
        dispatch(fetchClimbingRoutes());
      })
      .catch(err => {
        console.log('Error unliking a route ', err);
      });
  };
};

export const markComplete = (user, route) => {
  return function thunk(dispatch) {
    return axios
      .post('https://climbar.herokuapp.com/api/users/routes/complete', {
        user,
        route,
      })
      .then(res => {
        dispatch(fetchUser(getCookie()));
        dispatch(fetchClimbingRoutes());
      })
      .catch(err => {
        console.log('Error marking a route complete', err);
      });
  };
};

export const unComplete = (user, route) => {
  return function thunk(dispatch) {
    return axios
      .delete('https://climbar.herokuapp.com/api/users/routes/uncomplete', {
        data: {user, route},
      })
      .then(res => {
        dispatch(fetchUser(getCookie()));
        dispatch(fetchClimbingRoutes());
      })
      .catch(err => {
        console.log('Error marking a route complete', err);
      });
  };
};

export const rate = (user, route, rating) => {
  return function thunk(dispatch) {
    return axios
      .post('https://climbar.herokuapp.com/api/users/routes/rate', {
        user,
        route,
        rating,
      })
      .then(() => {
        dispatch(fetchUser(getCookie()));
        dispatch(fetchClimbingRoutes());
      })
      .catch(err => {
        console.log('Error rating a route ', err);
      });
  };
};

export const getUserToken = () => {
  return function thunk(dispatch) {
    return AsyncStorage.getItem('userToken')
      .then(data => {
        dispatch(getToken(data));
      })
      .catch(err => {
        dispatch(tokenError(err.message || 'ERROR'));
      });
  };
};

export const saveUserToken = () => {
  return function thunk(dispatch) {
    return AsyncStorage.setItem('userToken', 'abc')
      .then(() => {
        dispatch(saveToken('token saved'));
      })
      .catch(err => {
        dispatch(tokenError(err.message || 'ERROR'));
      });
  };
};

export const removeUserToken = () => {
  return function thunk(dispatch) {
    return AsyncStorage.removeItem('userToken')
      .then(data => {
        dispatch(removeToken(data));
      })
      .catch(err => {
        dispatch(tokenError(err.message || 'ERROR'));
      });
  };
};
