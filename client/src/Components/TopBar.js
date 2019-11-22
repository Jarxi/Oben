import React from 'react';
import { IconContext } from 'react-icons';
import { TiCog } from 'react-icons/ti';
import { NavLink, Link, Switch, Route, withRouter } from 'react-router-dom';
import '../CSS/TopBar.css';
import '../CSS/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.pathname);
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

            <div className='chooseTeamAndMember'>
              {this.props.location.pathname === '/home/override' && (
                <div class='dropdown show'>
                  <a
                    class='btn btn-secondary dropdown-toggle'
                    href='#'
                    role='button'
                    id='dropdownMenuLink'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Dropdown link
                  </a>

                  <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                    <a class='dropdown-item' href='#'>
                      Action
                    </a>
                    <a class='dropdown-item' href='#'>
                      Another action
                    </a>
                    <a class='dropdown-item' href='#'>
                      Something else here
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className='chooseTeamAndMember'>
              {this.props.location.pathname === '/home/override' && <p>test</p>}
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

export default withRouter(TopBar);
