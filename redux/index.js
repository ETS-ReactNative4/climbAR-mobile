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
  filterDrawer,
  token,
  ratingFormDrawer,
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
  filterDrawer,
  form: formReducer,
  token,
  ratingFormDrawer,
});
