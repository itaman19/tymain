import * as ActionTypes from '../ActionTypes';


export const auth = (state = { 
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user') ,
        errMess: null
 }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user : action.payload.user
            }
        case ActionTypes.LOGIN_FAILURE:
            return {
                 ...state,
                errMess:action.payload
            }
            
        default:
            return state;
    }
    
};