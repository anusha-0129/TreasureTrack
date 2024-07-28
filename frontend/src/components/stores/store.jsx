
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import incomeReducer from '../reducers/incomeReducer';
import expenseReducer from '../reducers/expenseReducer';
import Axios from 'axios';

Axios.defaults.withCredentials = true;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  income: incomeReducer,
  expense: expenseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
