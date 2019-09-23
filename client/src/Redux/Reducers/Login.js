import * as actionTypes from "../actionTypes";

const Login = (
  state = {
    isLoading: false,
    errMess: null,
    user: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN_LOADING:
      return { ...state, isLoading: true, errMess: null, user: null };
    case actionTypes.LOGIN_FAILED:
      return { ...state, isLoading: false, errMess: action.errMess, user: null };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, isLoading: false, errMess: null, user: action.user };
    default:
      return state;
  }
};

export default Login;
