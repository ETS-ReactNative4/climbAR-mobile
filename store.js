import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './redux/index';
import {AsyncStorage} from 'react-native';

const middleware = [
  thunkMiddleware.withExtraArgument({axios}),
  createLogger({collapsed: true}),
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

//will store the data locally in the reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  let persistor = persistStore(store);
  // returning an object
  return {store, persistor};
};

// export default createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );
