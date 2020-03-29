import {combineReducers} from 'redux';

import {
  holds,
  routeModel,
  user,
  statusMessage,
  climbingRoutes,
  climbingRoute,
  routeFilters,
  routeImage,
  token,
  filterDrawer,
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
  token,
  filterDrawer,
});
