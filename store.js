import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './redux/index';
import AsyncStorage from '@react-native-community/async-storage';

//Redux Persist takes your Redux state object and saves it to persisted storage. Then on app launch it retrieves this persisted state and saves it back to redux, similar to having cookies on the web
const middleware = [
  thunkMiddleware.withExtraArgument({axios}),
  createLogger({collapsed: true}),
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //the redux form in sign up can refresh
  whitelist: [],
};

//will store the data locally in the reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  // persistStore function, which ensures your redux state is saved to persisted storage whenever it changes.
  let persistor = persistStore(store);
  // returning an object
  return {store, persistor};
};
