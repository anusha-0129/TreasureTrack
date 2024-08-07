import Axios from 'axios';

export const ADD_INCOME = 'ADD_INCOME';
export const FETCH_INCOMES = 'FETCH_INCOMES';
export const DELETE_INCOME = 'DELETE_INCOME';
export const EDIT_INCOME = 'EDIT_INCOME';

const API_URL = import.meta.env.VITE_API_URL;

export const addIncome = (income) => async dispatch => {
  try {
    const response = await Axios.post(`${API_URL}/incomes`, income,{ withCredentials: true });
    dispatch({ type: ADD_INCOME, payload: response.data });
  } catch (error) {
    console.log("Add income error:", error);
  }
};

export const fetchIncomes = () => async dispatch => {
  try {
    const response = await Axios.get(`${API_URL}/incomes`,{ withCredentials: true });
    dispatch({ type: FETCH_INCOMES, payload: response.data });
  } catch (error) {
    console.log("Fetch incomes error:", error);
  }
};

export const deleteIncome = (id) => async dispatch => {
  try {
    await Axios.delete(`${API_URL}/incomes/${id}`,{ withCredentials: true });
    dispatch({ type: DELETE_INCOME, payload: id });
  } catch (error) {
    console.log("Delete income error:", error);
  }
};

export const editIncome = (id, updatedIncome) => async dispatch => {
  try {
    const response = await Axios.put(`${API_URL}/incomes/${id}`, updatedIncome,{ withCredentials: true });
    dispatch({ type: EDIT_INCOME, payload: response.data });
  } catch (error) {
    console.log("Edit income error:", error);
  }
};
