import {
  SET_HOLD,
  SET_HOLDS,
  SET_DRAGGING_HOLD,
  SET_ROUTE_MODEL,
  SET_USER,
  STATUS_MESSAGE,
  SET_CLIMBING_ROUTES,
  SET_CLIMBING_ROUTE,
  SET_ROUTE_FILTERS,
  SET_ROUTE_IMAGE,
  SET_ROUTE_VIDEO,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_EDIT_MODEL,
  TOGGLE_FILTER_DRAWER,
  GET_TOKEN,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  TOKEN_ERROR,
} from './constants';
import {htmlDate} from '../utils';
import moment from 'moment';
import {fetchHolds} from './thunks/holdThunks';

export const filterDrawer = (state = {show: false}, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_DRAWER:
      const newState = {show: !state.show};
      return newState;
    default:
      return state;
  }
};

export const routeFilters = (state = {}, action) => {
  switch (action.type) {
    case SET_ROUTE_FILTERS:
      const newState = {...state, ...action.filters};
      return newState;
    default:
      return state;
  }
};

export const draggingHold = (state = {}, action) => {
  switch (action.type) {
    case SET_DRAGGING_HOLD:
      return action.hold;
    default:
      return state;
  }
};

export const holds = (state = [], action) => {
  switch (action.type) {
    case SET_HOLDS:
      return action.holds;
    default:
      return state;
  }
};

export const routeModel = (
  state = {
    id: '',
    holds: [],
    draggingHold: {},
    sorted_holds: {},
    grade: '',
    holdColor: '',
    status: 'installed',
    endDate: moment(htmlDate(14)),
  },
  action,
) => {
  switch (action.type) {
    case SET_ROUTE_MODEL:
      return {...state, ...action.model};
    case SET_HOLD:
      const hold = action.hold;
      const {sorted_holds, draggingHold} = state;
      const xy = `${hold.coordinateX.toString()}-${hold.coordinateY.toString()}`;
      const filteredHolds = state.holds.filter(
        _h =>
          _h.id !== state.draggingHold.id &&
          _h.coordinateX !== hold.x &&
          _h.coordinateY !== hold.y,
      );
      const newDraggingHold = hold.id === draggingHold.id ? {} : draggingHold;
      if (hold.id === draggingHold.id) {
        delete sorted_holds[
          `${draggingHold.coordinateX.toString()}-${draggingHold.coordinateY.toString()}`
        ];
      }
      if (!sorted_holds[xy]) {
        sorted_holds[xy] = hold;
        return {
          ...state,
          holds: [...filteredHolds, hold],
          sorted_holds: {...sorted_holds},
          newDraggingHold,
        };
      }
      return state;
    case SET_DRAGGING_HOLD:
      return {...state, draggingHold: action.hold};
    case SET_EDIT_MODEL:
      const editModel = action.model;
      const holdsData = action.holdsData;
      let edit_holds = [];
      let edit_sorted_holds = {};
      for (let i = 0; i < editModel.routeModels.length; i++) {
        let thisHoldData = holdsData.filter(
          _h => _h.id === editModel.routeModels[i].holdId,
        )[0];
        edit_holds.push({
          ...thisHoldData,
          coordinateX: editModel.routeModels[i].positionX,
          coordinateY: editModel.routeModels[i].positionY,
          coordinateZ: -0.95,
        });
        let xy = `${editModel.routeModels[
          i
        ].positionX.toString()}-${editModel.routeModels[
          i
        ].positionY.toString()}`;
        if (!edit_sorted_holds[xy]) {
          edit_sorted_holds[xy] = {
            ...thisHoldData,
            coordinateX: editModel.routeModels[i].positionX,
            coordinateY: editModel.routeModels[i].positionY,
            coordinateZ: -0.95,
          };
        }
      }
      return {
        id: editModel.id,
        holds: edit_holds,
        draggingHold: {},
        sorted_holds: edit_sorted_holds,
        grade: editModel.grade,
        holdColor: editModel.holdColor,
        status: editModel.status,
        endDate: editModel.endDate,
      };
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export const statusMessage = (state = {status: null, text: ''}, action) => {
  switch (action.type) {
    case STATUS_MESSAGE:
      return action.message;
    default:
      return state;
  }
};

export const climbingRoutes = (state = [], action) => {
  switch (action.type) {
    case SET_CLIMBING_ROUTES:
      return action.routes;
    default:
      return state;
  }
};

export const climbingRoute = (state = {}, action) => {
  switch (action.type) {
    case SET_CLIMBING_ROUTE:
      return action.route;
    default:
      return state;
  }
};

export const routeImage = (state = {}, action) => {
  switch (action.type) {
    case SET_ROUTE_IMAGE:
      return action.image;
    default:
      return state;
  }
};

export const routeVideo = (state = {}, action) => {
  switch (action.type) {
    case SET_ROUTE_VIDEO:
      return action.video;
    default:
      return state;
  }
};

export const logInAuth = (state = {logInStatus: null}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {logInStatus: true};
    case LOGIN_FAILURE:
      return {logInStatus: false};
    default:
      return state;
  }
};

export const authReducer = (
  state = {
    user: null,
    isLoggedIn: false,
    isError: false,
    errors: null,
    token: null,
  },
  action,
) => {
  return state;
};

export const createUser = (state = {}, action) => {
  return state;
};

export const token = (
  state = {
    token: {},
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_TOKEN:
      return {...state, token: action.token};
    case SAVE_TOKEN:
      return {...state, token: action.token};
    case REMOVE_TOKEN:
      return {...state, token: action.token};
    case TOKEN_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};
