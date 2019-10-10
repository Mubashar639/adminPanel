import * as actionTypes from '../actionTypes';

export const login_loading = ()=>({
    type:actionTypes.LOGIN_LOADING
})

export const login_failed = (errMess)=>({
    type:actionTypes.LOGIN_FAILED,
    errMess
})

export const login_success = (user)=>({
    type:actionTypes.LOGIN_SUCCESS,
    user
})


export const facility_loading = ()=>({
    type:actionTypes.FACILITY_LOADING
})

export const facility_failed = (errMess)=>({
    type:actionTypes.FACILITY_FAILED,
    errMess
})

export const facility_success = (facility)=>({
    type:actionTypes.FACILITY_SUCCESS,
    facility
   
})

export const facility_add = (facility)=>({
    type:actionTypes.FACILITY_ADD,
    facility
   
})
export const facility_remove = (facility)=>({
    type:actionTypes.FACILITY_REMOVE,
    facility
   
})

export const facility_update = (facility)=>({
    type:actionTypes.FACILITY_UPDATE,
    facility
   
})



export const transport_success = (transport)=>({
    type:actionTypes.transport_SUCCESS,
    transport
   
})

export const transport_add = (transport)=>({
    type:actionTypes.transport_ADD,
    transport
   
})
export const transport_remove = (transport)=>({
    type:actionTypes.transport_REMOVE,
    transport
   
})

export const transport_update = (transport)=>({
    type:actionTypes.transport_UPDATE,
    transport
   
})



export const food_success = (food)=>({
    type:actionTypes.FOOD_SUCCESS,
    food
   
})

export const food_add = (food)=>({
    type:actionTypes.FOOD_ADD,
    food
   
})
export const food_remove = (food)=>({
    type:actionTypes.FOOD_REMOVE,
    food
   
})

export const food_update = (food)=>({
    type:actionTypes.FOOD_UPDATE,
    food
   
})



export const order_success = (order)=>({
    type:actionTypes.ORDER_SUCCESS,
    order
   
})

export const order_add = (order)=>({
    type:actionTypes.ORDER_ADD,
    order
   
})
export const order_remove = (order)=>({
    type:actionTypes.ORDER_REMOVE,
    order
   
})

export const order_update = (order)=>({
    type:actionTypes.ORDER_UPDATE,
    order
   
})

export const get_category = (category)=>({
    type:actionTypes.GET_CATEGORY,
    category  
})