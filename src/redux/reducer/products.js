import * as ActionTypes from '../ActionTypes';

export const Products = (state = { errMess: null, products:[]}, action) => {
    switch (action.type) {
            case ActionTypes.FETCH_PRODUCTS:
              return {...state, errMess: null, products: action.payload};
        
            case ActionTypes.PRODUCTS_FAILED:
              return {...state, errMess: action.payload};
        
            /*case ActionTypes.ADD_COMMENT:
                var product = action.payload;
                return { ...state, products: state.products.concat(product)};
        */
            default:
              return state;
          }
    };