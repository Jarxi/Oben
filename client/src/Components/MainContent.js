import React from 'react';
import '../CSS/Home.css';
import { IconContext } from 'react-icons';
import { TiCog } from 'react-icons/ti';
import { NavLink, Switch, Route } from 'react-router-dom';
import SetUpPage from '../Pages/SetUpPage';
import Dashboard from '../Pages/Dashboard';
import SubmissionPage from '../Pages/SubmissionPage';
import ApprovalPage from '../Pages/ApprovalPage';
import OverridePage from '../Pages/OverridePage';
import TopBar from './TopBar';
import ProfilePage from '../Pages/ProfilePage';
class MainContent extends React.Component {
  render() {
    const window = this.props.window;
    return (
      <div class='mainContent'>
        <TopBar></TopBar>
        <Switch>
          <Route path='/home/setup' component={SetUpPage} />
          <Route path='/home/approval' component={ApprovalPage} />
          <Route path='/home/override' component={OverridePage} />
          <Route path='/home/submission' component={SubmissionPage} />
          <Route path='/home/profile' component={ProfilePage} />
          <Route path='/home' exact={true} component={Dashboard} />
          
          <Route
            path='/'
            children={() => <p style={{ color: 'red' }}>Page in development</p>}
          />
        </Switch>
      </div>
    );
  }
}

export default MainContent;
