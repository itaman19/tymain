import * as ActionTypes from '../ActionTypes';

export const users = (state = { users: [], errMess: null ,loading:null}, action) => {
    switch (action.type) {
        case ActionTypes.USERS_LOADING:
            return { ...state, loading: true };
        case ActionTypes.FETCH_USERS:
            return { ...state, users: action.payload,loading:false };
        case ActionTypes.USERS_FAILED:
            return { ...state, errMess: action.payload ,loading:false};
        default:
            return state;
    }

}