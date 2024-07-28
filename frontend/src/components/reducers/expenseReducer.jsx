import { ADD_EXPENSE, FETCH_EXPENSES, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions/expenseAction';

const initialState = {
  expenses: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case FETCH_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload),
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense => expense._id === action.payload._id ? action.payload : expense),
      };
    default:
      return state;
  }
};

export default expenseReducer;
