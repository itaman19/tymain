import * as ActionTypes from '../ActionTypes';

export const Products = (state = { errMess: null, products:[],loading:null,product:null}, action) => {
  switch (action.type) {
            case ActionTypes.FETCH_PRODUCT:
                return { ...state,product:action.payload };
    
            case ActionTypes.PRODUCTS_LOADING:
              return { ...state, loading: true };
    
            case ActionTypes.FETCH_PRODUCTS:
              return {...state, errMess: null,loading:false, products: action.payload};

            case ActionTypes.ADD_PRODUCT:
              return { ...state, errMess: null, products: [...state.products, action.payload] };
      
            case ActionTypes.UPDATE_PRODUCT:

                return {
                ...state, errMess: null, products: state.products.map(x => x.id === action.payload.id ? action.payload : x)
              };
            
            case ActionTypes.DELETE_PRODUCT:

                return {
                      ...state, errMess: null, products: state.products.filter(x => x.id !== action.payload)
                    };
              

      
            case ActionTypes.PRODUCTS_FAILED:
              return {...state,errMess:action.payload, loading:false};
        
            /*case ActionTypes.ADD_COMMENT:
                var product = action.payload;
                return { ...state, products: state.products.concat(product)};
        */
            default:
              return state;
          }
    };