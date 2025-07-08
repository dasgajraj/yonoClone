// RootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeReducer } from './themeReducer';
import { userReducer } from './userReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeReducer', 'userReducer'], 
};

const rootReducer = combineReducers({
  themeReducer,
  userReducer,
});

export default persistReducer(persistConfig, rootReducer);