import * as actionTypes from "../actionTypes";

const catagory = (
  state = {
    category:[]
  },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY:
      return { ...state, category:action.category };
    case actionTypes.FACILITY_FAILED:
      return { ...state };
    
    default:
      return state;
  }
};

export default catagory;
