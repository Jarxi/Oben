import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import './CSS/App.css';
import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';
import HomePage from './Pages/HomePage';
import ResetPasswordForm from './Components/ResetPasswordForm';
import SubmissionPage from './Pages/SubmissionPage';
import PrivateRoute from '../src/Components/PrivateRoute';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/resetPassword" component={ResetPasswordForm} />
        <PrivateRoute exact path="/home" component={HomePage} />
        <Route exact path="/" component={SignInForm} />
        <Route exact path="/submission" component={SubmissionPage} />
      </BrowserRouter>
    </div>


  );
}

export default App;
