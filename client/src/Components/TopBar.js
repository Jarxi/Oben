import React from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { TiCog } from 'react-icons/ti';
import { NavLink, Link, Switch, Route, withRouter } from 'react-router-dom';
import '../CSS/TopBar.css';
import '../CSS/Home.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.location.pathname);
  }

  render() {
    return (
      <div className='topBar'>
        <div className='TopRow'>
          <div className='row info'>
            <div className='identity'>
              <p>
                {sessionStorage.getItem('user_type') === 'aic'
                  ? 'Account In Charge'
                  : sessionStorage.getItem('user_type')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TopBar);
