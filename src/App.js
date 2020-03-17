import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignIn from '../src/Components/SignIn'
import DashBoard from './Components/DashBoard';

function App() {
  return (
    
    <div className="App">
      
      <Router>
        <Route path="/" exact component={SignIn} />
        <Route path="/signin" component={SignIn} />
        <Route path="/home" component={DashBoard}/>
      </Router>
    </div>
  );
}

export default App;
