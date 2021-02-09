import * as ActionTypes from './ActionTypes';
import Cookie from 'js-cookie';

export const fetchProducts = () => (dispatch) => {

    //dispatch(dishesLoading(true));
    return fetch("http://localhost:3001/products")
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
    
}

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const addProducts = (products) => ({
    type: ActionTypes.FETCH_PRODUCTS,
    payload: products
});

export const fetchCartItems = () => (dispatch) => {

    //dispatch(dishesLoading(true));
    return fetch("http://localhost:3001/cart")
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
      .then(cartItems => {
        console.log(cartItems)
        dispatch({
          type: ActionTypes.ADD_CART_ITEMs,
          payload: cartItems
        })
      })
      .catch(error => dispatch({
        type: ActionTypes.CART_ITEMS_FAILED,
        payload:error.message
      }));
    
}
export const updateCart = (product, qty) => (dispatch, getState) => {

   return fetch("http://localhost:3001/cart/" + product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product.product_id,
        name: product.name,
        image: product.image,
        price: product.price,
        inStock: product.inStock,
        qty
      })
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(cartItem => dispatch(
        {
          type: ActionTypes.CART_ADD_ITEM,
          payload: cartItem
        }))
      .catch(error => dispatch({
        type: ActionTypes.CART_ITEMS_FAILED,
        payload: error.message
      }))
}


export const addToCart = (product, qty) => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();
  const item = cartItems.find((x) => x.product_id === product.id);
  console.log(item);
  item ?
    dispatch(updateCart(item,qty))
    :
    
     fetch("http://localhost:3001/cart", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        inStock: product.inStock,
        qty
      })
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(cartItem => dispatch(
        {
          type: ActionTypes.CART_ADD_ITEM,
          payload: cartItem
        }))
      .catch(error => dispatch({
        type: ActionTypes.CART_ITEMS_FAILED,
        payload: error.message
      }))
   
  
  


  /*dispatch({
    type: ActionTypes.CART_ADD_ITEM,
    payload: {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      inStock: product.inStock,
      qty
    }
  });
  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
  const a = Cookie.getJSON("cartItems")
  console.log(a);*/
}

export const removeCartItem = (id) => (dispatch) => {
  return fetch("http://localhost:3001/cart/"+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        dispatch(
          {
            type: ActionTypes.CART_REMOVE_ITEM,
            payload: id
          });
      }
    })
    .catch(error => dispatch({
      type: ActionTypes.CART_ITEMS_FAILED,
      payload: error.message
    }))
}
export const loginUser = (email, password) => (dispatch) => {
  return fetch("https://reqres.in/api/register", {
    method: 'POST',
    headers: { 
            'Content-Type':'application/json' 
    },
    body : JSON.stringify({email,password})
  })
    .then(response => {
      if (response.ok) {
        return response
      }
      else {
        var error = new Error('Error' + response.status + ":" + response.statusText); 
        throw error;

      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(response => {
      if (response.id) {
        alert("login Successful");
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.id);
        dispatch(fetchProducts());
        dispatch(
          {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: {
              token: response.token,
              user: response.id
            }
          });
      }
      else {
        var error = new Error('Error ' + response.status + " " + response.statusText);
        throw error; 
      }
    })
    .catch(error => dispatch({
      type: ActionTypes.LOGIN_FAILURE,
      payload: error
  }))
      
  }


export const signUpUser = (email, password) => (dispatch) => {
  const a = JSON.stringify({ email, password });
  console.log(a);
  return fetch("https://reqres.in/api/register", {
    method: 'POST',
    headers: { 
            'Content-Type':'application/json' 
    },
    body : JSON.stringify({email,password})
  })
    .then(response => {
      if (response.ok) {
        return response
      }
      else {
        var error = new Error('Error' + response.status + ":" + response.statusText);
        throw error;

      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(response => {
      if (response.id) {
        alert("SignUp and login Successful");
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.id);
        dispatch(fetchProducts());
        dispatch(
          {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: {
              token: response.token,
              user: response.id
            }
          });
      }
      else {
        var error = new Error('Error' + response.status + ":" + response.statusText);
        
        throw error; 
      }
    })
    .catch(error => dispatch({
      type: ActionTypes.LOGIN_FAILURE,
      payload: error
  }))
      
  }

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  alert('logged out successfullly');
  window.location.replace("http://localhost:3000/login");
 }