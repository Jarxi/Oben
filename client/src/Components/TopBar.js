import React from 'react';
import { IconContext } from 'react-icons';
import { TiCog } from 'react-icons/ti';
import { NavLink, Link, Switch, Route, withRouter } from 'react-router-dom';
import '../CSS/TopBar.css';
import '../CSS/Home.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
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

            {this.props.location.pathname === '/home/override' && (
              <div className='chooseTeamAndMember'>
                <select>
                  <option selected='selected'>Select Team</option>
                  <option value='volvo'>1</option>
                  <option value='saab'>2</option>
                  <option value='mercedes'>3</option>
                  <option value='audi'>4</option>
                </select>
              </div>
            )}
            {this.props.location.pathname === '/home/override' && (
              <div className='chooseTeamAndMember'>
                <select>
                  <option selected='selected'>Select Team Member</option>
                  <option value='volvo'>1</option>
                  <option value='saab'>2</option>
                  <option value='mercedes'>3</option>
                  <option value='audi'>4</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TopBar);
