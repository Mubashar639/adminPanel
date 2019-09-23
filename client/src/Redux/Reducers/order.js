import * as actionTypes from "../actionTypes";

const Order = (
  state = {
    isLoading: false,
    errMess: null,
    user: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ORDER_SUCCESS:
      return { ...state, isLoading: false, errMess: null, orders: action.order };
    case actionTypes.ORDER_ADD:
      {
        const order = action.order
        return {
          ...state, isLoading: false, errMess: null,
          orders: [...state.orders, order]
        }
      }
    case actionTypes.ORDER_REMOVE:
      debugger;
      {
        const orders = state.orders.filter((order,index)=>order._id !== action.order)
        return {
          ...state, isLoading: false, errMess: null,
          orders
        }
      }

      case actionTypes.ORDER_UPDATE:
          debugger;
          {
            const orders = state.orders.map((order,index)=>{
             if(order._id === action.order.id) return action.order.updatedorder
            else
             return order
            })
            return {
              ...state, isLoading: false, errMess: null,
              orders
            }
          }
    default:
      return state;
  }
};

export default Order;
