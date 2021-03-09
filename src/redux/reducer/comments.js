import * as ActionTypes from '../ActionTypes';

export const comments = (state = { 
        commentsLoading:true,
        comments:[],
        commentsErrMess: null
 }, action) => {
    switch (action.type) {
        case ActionTypes.COMMENTS_LOADING:
            return {
                ...state,
                commentsLoading: true
                
            }
        case ActionTypes.GET_COMMENTS:

            return {
                ...state,
                commentsLoading: false,
                comments: action.payload.reverse()
                
            }
        case ActionTypes.GET_COMMENTS_FAILED:
            return {
                 ...state,
                commentsErrMess: action.payload,
                commentsLoading:false
            }
            
        default:
            return state;
    }
    
};