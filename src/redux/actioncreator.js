
import * as ActionTypes from './ActionTypes';

const bearer = 'Bearer ' +localStorage.getItem('token')
export const fetchProducts = () => (dispatch) => {

  dispatch({type:ActionTypes.PRODUCTS_LOADING,payload:true});
  return fetch("/products")
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
    .catch(error => {
      dispatch({
      type: ActionTypes.PRODUCTS_FAILED,
      payload: error.message
      });
    });
    
}
export const fetchProduct = (id) => (dispatch) => {

  
  return fetch("/products/"+id)
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
    .then(product => dispatch({
      type: ActionTypes.FETCH_PRODUCT,
      payload:product
    }))
    .catch(error => {
      dispatch({
      type: ActionTypes.PRODUCTS_FAILED,
      payload: error.message
      });
    });
    
}


export const postProduct = (formData) => (dispatch) => {
  
  fetch("/productUpload", {
      method: 'POST',
      headers: {
        'Authorization':bearer 
      },
      body: formData ,
      credentials:'same-origin'
    })
    .then(response => {
      if (response.ok) {
        alert("successfully added");
        dispatch(fetchProducts());
        
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
      .catch(error => alert(error.message));
    
}

export const updateProduct = (formData) => (dispatch) => {
  return fetch("/productUpload/" + formData.get('_id'), {
    method: "PUT",
    headers: {
      'Authorization':bearer 
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        //console.log(response);
        //return response;
        dispatch(fetchProduct(formData.get('_id')));
        dispatch(fetchProducts());
        
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    /*.then(response => response.json())
    .then(product => {
      dispatch({
        type: ActionTypes.UPDATE_PRODUCT,
        payload: product
      })
    })*/
    .catch(error => alert(error.message))
      
}
  
export const deleteProduct = (id) => (dispatch) => {
  return fetch("/products/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearer 
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        alert("product deleted successfully");
        window.location.replace("http://localhost:3000/home");
        dispatch({
          type: ActionTypes.DELETE_PRODUCT,
          payload:id
        })
      }
    })
    .catch(error =>alert(error.message))
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
  dispatch({type:ActionTypes.CARTITEMS_LOADING});

  return fetch("/cart", {
    headers: {
      'Authorization':bearer 
    }
    })
    .then(response => {
      if (response.ok) {
        return response;
        }else {
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
      console.log(cartItems);
        dispatch({
          type: ActionTypes.ADD_CART_ITEMs,
          payload: cartItems
        })
    })
    .catch(error => {
      console.log("failed");
      alert(error.message)
      dispatch({
        type: ActionTypes.CART_ITEMS_FAILED,
        payload: error.message
      });
    });
    
}
export const updateCart = (item, qnty) => (dispatch, getState) => {
   return fetch("/cart/" +item.product._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':bearer 

      },
      body: JSON.stringify({
        qnty
      })
    })
      .then(response => {
        if (response.ok) {
           dispatch(fetchCartItems())
        }
      })
      .catch(error => alert(error.message))
}


export const addToCart = (product, qnty) => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();

  const item = cartItems.find((x) => x.product._id === product._id);
  item ?
    dispatch(updateCart(item, qnty))
    :
    fetch("/cart", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({ products: { product, qnty } })
    })
      .then(response => {
        if (response.ok) {
          dispatch(fetchCartItems());
        }
      })
      .catch(error => alert(error.message));
   
  
  


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
  return fetch("/cart/"+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearer 
    }
  })
    .then(response => {
      if (response.ok) {
        /*dispatch(
          {
            type: ActionTypes.CART_REMOVE_ITEM,
            payload: id
          });*/
        dispatch(fetchCartItems());
      }
    })
    .catch(error => dispatch({
      type: ActionTypes.CART_ITEMS_FAILED,
      payload: error.message
    }))
}
export const emptyCart = () => (dispatch) => {
  return fetch("/cart", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearer 
    }
  })
    .then(response => {
      if (response.ok) {
        dispatch(
          {
            type: ActionTypes.CART_EMPTY,
            
          });
      }
    })
    .catch(error => alert(error.message))
}

export const checkJwtToken = () => (dispatch) => {
  return fetch("/users/checkJWTToken", {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization':bearer 
    },
    credentials:'same-origin'
  })
    .then(response => {
      
      if (response.ok) {
        
        return response;
      }
      else {
        var error = new Error( response.status + ":" + response.statusText); 
        throw error;

      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.success) {
      } 
    })
    .catch(error => {
      alert("Your Token expired. Login again!")
      dispatch(logoutUser());})
      
  }

export const loginUser = (username, password) => (dispatch) => {
  return fetch("users/login", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials:'same-origin'
  })
    .then(response => {
      if (response.ok) {
        return response
      }
      else {
        var error = new Error(" Email id and password doesn't match"); 
        throw error;

      }
    }, error => {
      throw error;
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        alert("login Successful");
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.name);
        localStorage.setItem('mail', response.user.username);
        localStorage.setItem('admin', response.user.admin);
        localStorage.setItem('address', response.user.address);
        localStorage.setItem('phone', response.user.phone);
        localStorage.setItem('pin', response.user.pin);
        localStorage.setItem('uid', response.user._id);
        dispatch(
          {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: {
              token: response.token,
              user: response.user
            }
          });
        window.location.href = 'http://localhost:3000/home';
      }
      else {
        var error = new Error("Email id and password doesn't match");
        throw error; 
      }
    })
    .catch(error => dispatch({
      type: ActionTypes.LOGIN_FAILURE,
      payload: error
  }))
      
  }


export const signUpUser = (email, password, username, phonenumber, address, pincode) => (dispatch) => {
  alert("your registration request sent successfully");
  return fetch("/users/signup", {
    method: 'POST',
    headers: { 
            'Content-Type':'application/json' 
    },
    body: JSON.stringify({username:email, password,name:username,address,pin:pincode,phone:phonenumber}),
    credentials:'same-origin'
  })
    .then(response => {
      if (response.ok) {
         alert("verification mail has been sent to your email id after verifying your signup will be scuccessfull");
        window.location.replace("http://localhost:3000/login");
      }
      else {
        console.log(response);
        var error = new Error('Error' + response.status + ":" + response.statusText);
        throw error;

      }
    }, error => {
      throw error;
    })
    .catch(error =>alert("user already exists"))
      
  }

export const logoutUser = () => {
  localStorage.clear();
  alert('logged out successfullly');
  window.location.replace("http://localhost:3000/login");
}
 

export const postOrder = (cart,paymentMethod,totalAmt) => (dispatch, getState) => {
    
    fetch("/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':bearer 
      },
      body: JSON.stringify({

        cart,paymentMethod,totalAmt
        

      })
    })
      .then(response => {
        if (response.ok) {
          dispatch(emptyCart());
          dispatch(fetchOrders());
        }
        else {
          alert("some thing went wrong! Please try again ")
        }
      })
      
      .catch(error => alert("some thing went wrong! Please try again "))
}

export const fetchOrders = () => (dispatch,getState) => {
  const { auth: { isAdmin } } = getState();
  dispatch({type:ActionTypes.ORDERS_LOADING});
  return fetch(isAdmin?"/admin/orders":"/orders", {
    headers: {
        'Authorization':bearer 
      }
    })
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
      .then(orders => {
        console.log(orders)
        dispatch({
          type: ActionTypes.GET_ORDERS,
          payload: orders
        })
      })
      .catch(error => dispatch({
        type: ActionTypes.GET_ORDERS_FAILED,
        payload:error.message
      }));
    
}

export const updateOrder = ({_id,delivered,payment}) => (dispatch) => {

  return fetch("/admin/orders/" + _id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearer 
    },
    body: JSON.stringify({delivered,payment}) 
  })
    .then(response => {
      if (response.ok) {
        alert("order updated successfully");
        dispatch(fetchOrders());
      }else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
    })
    .catch(err => alert(err));
}


export const fetchUsers = () => (dispatch) => {

  dispatch({type:ActionTypes.USERS_LOADING});
  return fetch("/admin/users", {
    headers: {
        'Authorization':bearer 
      }
    })
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
      .then(users => dispatch({
        type: ActionTypes.FETCH_USERS,
        payload:users
    }))
      .catch(error => dispatch({
        type:ActionTypes.USERS_FAILED,
        payload:error.message
      }));
    
}



export const fetchFeedbacks = () => (dispatch) => {

  dispatch({type:ActionTypes.FEEDBACKS_LOADING});
  return fetch("/feedbacks", {
    headers: {
        'Authorization':bearer 
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(response);
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
      .then(feedbacks => {
        dispatch({
          type: ActionTypes.FETCH_FEEDBACKS,
          payload: feedbacks
        })
      })
      .catch(error => dispatch({
        type: ActionTypes.FEEDBACKS_FAILED,
        payload:error.message
      }));
    
}


export const postFeedback = (name, email, message) => (dispatch) => {
  
    
    fetch("/feedbacks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':bearer 
      },
      body: JSON.stringify({

        name,
        email,
        message
        

      })
    })
      .then(response => {
        if (response.ok) {
        alert("your feedback recorded successfully");
          
        }
      })
      
      .catch(error => dispatch({
        type: ActionTypes.FEEDBACKS_FAILED,
        payload:error.message
      }))
}

export const postComment = (id, rating, comment) => (dispatch) => {
  
    
  fetch("/products/" + id + "/comments", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    body: JSON.stringify({

      id,
      rating,
      comment
        

    })
  })
    .then(response => {
      if (response.ok) {
        alert("your review added successfully");
        dispatch(fetchComments(id));
          
      }
    })
      
    .catch(error => alert(error));
}


export const fetchComments = (id) => (dispatch) => {

  dispatch({type:ActionTypes.COMMENTS_LOADING});
  return fetch("/products/"+id+"/comments", {
    headers: {
        'Authorization':bearer 
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(response);
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
      .then(comments => {
        dispatch({
          type: ActionTypes.GET_COMMENTS,
          payload: comments
        })
      })
      .catch(error => dispatch({
        type: ActionTypes.GET_COMMENTS_FAILED,
        payload:error.message
      }));
    
}


export const updateAddress = (address,pin) => (dispatch) => {
    
    fetch("/users", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':bearer 
      },
      body: JSON.stringify({

        address,pin
        

      })
    })
      .then(response => {
        if (response.ok) {
          dispatch(fetchUser());
          alert("updated Successfully");
        }
        else {
          alert("some thing went wrong! Please try again ")
        }
      })
      
      .catch(error => alert("some thing went wrong! Please try again "))
}

export const fetchUser = () => (dispatch) => {
  return fetch("/users", {
    headers: {
      'Authorization': bearer
    }
  })
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
    .then(user => {
        localStorage.setItem('username', user.name);
        localStorage.setItem('mail', user.username);
        localStorage.setItem('admin', user.admin);
        localStorage.setItem('address', user.address);
        localStorage.setItem('phone', user.phone);
        localStorage.setItem('pin', user.pin);
        dispatch(
          {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: {
              user
            }
          });
    })
    .catch(error => alert(error.message));
    
}

export const forgotPassword = (username) => (dispatch) => {
  
  alert("your request sent successfully ");
  fetch("/users/forgot", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      username
        

    })
  })
    .then(response => {
      if (response.ok) {
        alert("A reset link has been sent to "+username);
        console.log(response.json());
          
      }
    })
      
    .catch(error => alert(error));
}


export const onlinePayment = (user,cart,amount,email) => (dispatch) => {
  
    
  fetch("/api/payment", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      user,cart,amount,email
        

    })
  })
    .then(response => {
      if (response.ok) {
        return response;
        //fetch("https://securegw-stage.paytm.in/order/process")
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      const form = new FormData();
      Object.entries(response).forEach(([key, value]) => {
        form.append(key, value);
      });
      fetch("https://securegw-stage.paytm.in/order/process", {
        method: 'POST',
        body: form
      })
    })
      
    .catch(error => alert(error));
}