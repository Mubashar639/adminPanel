import * as actionTypes from "../actionTypes";

const Transport= (
  state = {
    isLoading: false,
    errMess: null,
    user: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.transport_SUCCESS:
      return { ...state, isLoading: false, errMess: null, transports: action.transport };
    case actionTypes.transport_ADD:
      {
        const transport = action.transport
        return {
          ...state, isLoading: false, errMess: null,
          transports: [...state.transports, transport]
        }
      }
    case actionTypes.transport_REMOVE:
      {
        const transports = state.transports.filter((tranport,index)=>tranport._id !== action.transport)
        return {
          ...state, isLoading: false, errMess: null,
          transports
        }
      }

      case actionTypes.transport_UPDATE:
          debugger;
          {
            const transports = state.transports.map((tranport,index)=>{
             if(tranport._id === action.transport.id) return action.transport.updatedtransport
            else
             return tranport
            })
            return {
              ...state, isLoading: false, errMess: null,
              transports
            }
          }
    default:
      return state;
  }
};

export default Transport;
