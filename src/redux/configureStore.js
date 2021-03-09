import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import Cookie from 'js-cookie';
import { Products } from './reducer/products';
import { cart } from './reducer/cart';
/*import { Promotions } from './promotions';
import { Dishes } from './dishes';
import { Leaders } from './leaders';*/
import ReduxThunk from 'redux-thunk';
import {logger} from 'redux-logger';
import { auth } from './reducer/auth';
/*import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';*/
import { orders } from './reducer/orders'
import { users } from './reducer/users';
import { feedbacks } from './reducer/feedbacks';
import { comments } from './reducer/comments';

const initialState = {
}
const reducer =combineReducers({
            products: Products,
            cart: cart,
            auth: auth,
            orders,
            users,
            feedbacks,
            comments
            
        })
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {const store = createStore(reducer, initialState, composeEnhancers(
        applyMiddleware(ReduxThunk,logger)
    ));

    return store;
}
