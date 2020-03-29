import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import {
  holds,
  routeModel,
  user,
  statusMessage,
  climbingRoutes,
  climbingRoute,
  routeFilters,
  routeImage,
  logInAuth,
  authReducer,
  createUser
} from './reducers';

export default combineReducers({
  holds,
  routeModel,
  user,
  statusMessage,
  climbingRoutes,
  climbingRoute,
  routeFilters,
  routeImage,
  logInAuth,
  authReducer,
  form: formReducer,
  createUser,
});
