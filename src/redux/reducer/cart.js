import * as ActionTypes from '../ActionTypes';


export const cart = (state = { cartId:null,cartItems: [] ,errMess: null,loading:null}, action) => {
    switch (action.type) {
        case ActionTypes.CARTITEMS_LOADING:
            return {
                ...state,loading:true
            }
        case ActionTypes.ADD_CART_ITEMs:
            console.log(action.payload);
            return {
                ...state, cartItems:action.payload == null?[]:action.payload.products,cartId:action.payload == null?null:action.payload._id,loading:false,errMess:null

            }
         case ActionTypes.CART_ITEMS_FAILED:
            return {
                ...state, errMess: action.payload,loading:false,cartItems:[]
            }
        case ActionTypes.CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find((x) => x._id === item._id);
            if (product) {
                return {
                    ...state, cartItems:
                        state.cartItems.map(x => x.id === product._id ? item : x)
                };
            }
            else {
                return {
                    ...state, cartItems:
                        [...state.cartItems, item]
                };
            }
        case ActionTypes.CART_REMOVE_ITEM:
            return {
                ...state, cartItems:
                    state.cartItems.filter((x) => x._id !== action.payload)
            }
         case ActionTypes.CART_EMPTY:
            return {
                ...state, cartItems:[]
            }
        default:
            return state;
    }
    
};