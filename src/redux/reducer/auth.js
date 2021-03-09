import * as ActionTypes from '../ActionTypes';

export const auth = (state = { 
        token:localStorage.getItem('token'),
        username:localStorage.getItem('username'),
        errMess: null,
    isAdmin: localStorage.getItem('admin') === "true" ? true : false,
    address: localStorage.getItem('address'),
    phone: localStorage.getItem('phone'),
    pin: localStorage.getItem('pin'),
    mail: localStorage.getItem('mail'),
    user_id: localStorage.getItem('uid')
        
 }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            console.log(state.isAdmin);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.name,
                isAdmin: action.payload.user.admin,
                address: action.payload.user.address,
                phone: action.payload.user.phone,
                pin: action.payload.user.pin,
                mail: action.payload.user.username,
                user_id:action.payload.user._id
                
                
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