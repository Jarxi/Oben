import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import SignInForm from './Components/SignInForm'
import SignUpForm from './Components/SignUpForm'

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/signup">
            <SignUpForm/>
        </Route>
        <Route exact path="/">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="FormTitle">Records Management System</div>
            <SignInForm/>
          </div>
        </Route>      
      </Router>
    </div>

    
  );
}

export default App;
