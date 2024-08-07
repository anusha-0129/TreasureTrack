import Axios from 'axios';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_EXPENSES = 'FETCH_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const API_URL = import.meta.env.VITE_API_URL;

export const addExpense = (expense) => async dispatch => {
  try {
    const response = await Axios.post(`${API_URL}/expenses`, expense,{ withCredentials: true });
    dispatch({ type: ADD_EXPENSE, payload: response.data });
  } catch (error) {
    console.log("Add expense error:", error);
  }
};

export const fetchExpenses = () => async dispatch => {
  try {
    const response = await Axios.get(`${API_URL}/expenses`,{ withCredentials: true });
    dispatch({ type: FETCH_EXPENSES, payload: response.data });
  } catch (error) {
    console.log("Fetch expenses error:", error);
  }
};

export const deleteExpense = (id) => async dispatch => {
  try {
    await Axios.delete(`${API_URL}/expenses/${id}`,{ withCredentials: true });
    dispatch({ type: DELETE_EXPENSE, payload: id });
  } catch (error) {
    console.log("Delete expense error:", error);
  }
};

export const editExpense = (id, updatedExpense) => async dispatch => {
  try {
    const response = await Axios.put(`${API_URL}/expenses/${id}`, updatedExpense,{ withCredentials: true });
    dispatch({ type: EDIT_EXPENSE, payload: response.data });
  } catch (error) {
    console.log("Edit expense error:", error);
  }
};
