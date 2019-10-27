import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './CSS/App.css';
import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';
import HomePage from './Pages/HomePage';
import ResetPasswordForm from './Components/ResetPasswordForm';
import Dashboard from './Pages/Dashboard'
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={SignInForm} />      
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/resetPassword" component={ResetPasswordForm} />
      </Router>
    </div>


  );
}

export default App;
