import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/authAction';

const token = localStorage.getItem('token');
const initialState = {
  isAuthenticated: !!token, 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
