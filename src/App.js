import React from 'react';
import './App.css';
import Home from './components/HomeComponent';
import Login from './components/LoginComponent';
import SignUp from './components/SignupComponent';
import {Switch, Route} from 'react-router-dom';
import Main from './components/MainComponent';

const loggedIn=false;
function App() {
  return (
      <div className="App">
      <Switch >
      <Route exact path="/">{loggedIn?<Home/>:<Login/>}</Route>

        <Route exact path="/login"><Login/></Route>
        <Route exact path="/signup"><SignUp/></Route>
        
        <Main/>
        
        
        
        
      </Switch>
      

      </div>
  );
}

export default App;
