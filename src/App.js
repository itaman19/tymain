import React,{useEffect} from 'react';
import './App.css';
import Login from './components/LoginComponent';
import SignUp from './components/SignupComponent';
import {Switch, Route,withRouter} from 'react-router-dom';
import Main from './components/MainComponent';
import { connect } from 'react-redux';
import { fetchProducts } from "./redux/actioncreator";
import ForgotPass from './components/ForgotPass';





function App() {
  return (
      <div className="App">
      <Switch >

        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path='/forgot' component={ForgotPass}></Route>
        <Main />
        
        
        
        
      </Switch>
      

      </div>
  );
}

export default App;
