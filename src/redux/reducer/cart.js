import * as ActionTypes from '../ActionTypes';


export const cart = (state = { cartItems: [] ,errMess: null}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CART_ITEMs:
            console.log(action.payload);
            return {
                ...state, cartItems:action.payload

            }
         case ActionTypes.CART_ITEMS_FAILED:
            return {
                ...state, errMess: action.payload
            }
        case ActionTypes.CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find((x) => x.id === item.id);
            if (product) {
                return {
                    ...state, cartItems:
                        state.cartItems.map(x => x.id === product.id ? item : x)
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
                    state.cartItems.filter((x) => x.id !== action.payload)
            }
        default:
            return state;
    }
    
};