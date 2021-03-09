import * as ActionTypes from '../ActionTypes';


export const orders = (state = { orders: [] ,errMess: null,loading:null}, action) => {
    switch (action.type) {
        case ActionTypes.ORDERS_LOADING:
            return {
                ...state,loading:true
            }

        case ActionTypes.GET_ORDERS:
            console.log(action.payload);
            return {
                ...state, orders:action.payload.reverse(),loading:false

            }
         case ActionTypes.GET_ORDERS_FAILED:
            return {
                ...state, errMess: action.payload,loading:false
            }
       
        default:
            return state;
    }
    
};