import * as ActionTypes from '../ActionTypes';

export const feedbacks = (state = { errMess: null, feedbacks: [] , loading:false }, action) => {
    switch (action.type) {
        case ActionTypes.FEEDBACKS_LOADING:
            return { ...state, loading: true };
        case ActionTypes.FETCH_FEEDBACKS:
            return { ...state, feedbacks: action.payload.reverse() ,loading:false };
        case ActionTypes.FEEDBACKS_FAILED:
            return { ...state, errMess: action.payload ,loading:false};
        
        default:
            return state ;
    }
}

