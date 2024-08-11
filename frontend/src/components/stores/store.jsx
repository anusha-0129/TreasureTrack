import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import incomeReducer from '../reducers/incomeReducer';
import expenseReducer from '../reducers/expenseReducer';
import Axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.common['Authorization'] = token;
}

const rootReducer = combineReducers({
  auth: authReducer,
  income: incomeReducer,
  expense: expenseReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
