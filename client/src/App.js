import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './CSS/App.css';
import SignInForm from './Components/SignInForm'
import SignUpForm from './Components/SignUpForm'

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={SignInForm} />      
      </Router>
    </div>

    
  );
}

export default App;
