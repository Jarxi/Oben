import React from 'react';
import { IconContext } from 'react-icons';
import { TiCog } from 'react-icons/ti';
import { NavLink, Switch, Route } from 'react-router-dom';
import '../CSS/TopBar.css';
import '../CSS/Home.css';
class TopBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div class='topBar'>
        <div class='TopRow'>
          <div className='row info'>
            <div className='identity'>
              <a link=''>
                {sessionStorage.getItem('user_type') === 'aic'
                  ? 'Account In Charge'
                  : sessionStorage.getItem('user_type')}
              </a>
            </div>
            <IconContext.Provider value={{ color: 'black', size: '4em' }}>
              <div className='Setting_Icon'>
                <NavLink to='/resetPassword'>
                  <TiCog />
                </NavLink>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
