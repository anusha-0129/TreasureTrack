import { ADD_INCOME, FETCH_INCOMES, DELETE_INCOME, EDIT_INCOME } from '../actions/incomeAction';

const initialState = {
  incomes: [],
};

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INCOME:
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
      };
    case FETCH_INCOMES:
      return {
        ...state,
        incomes: action.payload,
      };
    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(income => income._id !== action.payload),
      };
    case EDIT_INCOME:
      return {
        ...state,
        incomes: state.incomes.map(income => income._id === action.payload._id ? action.payload : income),
      };
    default:
      return state;
  }
};

export default incomeReducer;
