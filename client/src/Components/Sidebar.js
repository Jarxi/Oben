import React from 'react';
import { MdPersonOutline, MdPersonAdd, MdAssignment, MdPeople} from "react-icons/md";
import { TiThumbsUp } from "react-icons/ti";
import { FaAddressBook, FaChartBar } from "react-icons/fa";
import '../CSS/Home.css';
import { Link, useRouteMatch } from 'react-router-dom';
import propTypes from 'prop-types';

class Sidebar extends React.Component {
  constructor(){
    super();
    this.state = {
      user_type: sessionStorage.getItem('user_type')
      // user_type: 'aic'
    }
  }

  render(){
    return (
      <div class="sidebar">
        <Link to='/home'>
          <button class="overview">
            <h3><span ><MdPersonOutline/></span>Overview</h3>
          </button>
        </Link>
        <hr/>
        <div class="nav_links">
          <div class="submission">
            <h3>Tasks</h3>
            {
              this.state.user_type === 'aic' &&
              <p>
                <Link to='/home/override'>
                  <button>
                    <span><FaAddressBook/></span>Override
                  </button>
                </Link>
              </p>
            }
            {
              this.state.user_type !== 'aic' &&
              <p>
                <Link to='home/submission'>
                  <button>
                    <span><MdAssignment/></span>Submission
                  </button>
                </Link>
              </p>
            }
            {
              ['aic', 'team_leader'].includes(this.state.user_type) &&
              <p>
                <Link to='/home/approval'>
                  <button>
                    <span><TiThumbsUp/></span>Approval
                  </button>
                </Link>
              </p>
            }
            

          </div>
          <div class="reports">
            <h3>Reports</h3>
            <p>
              <Link to='/home/report'>
                <button>
                  <span><FaChartBar/></span>Time and Expense
                </button>
              </Link>
            </p>
          </div>
          <div class="manage">
            <h3>Manage</h3>
            {
              this.state.user_type === "aic" ?
              ( 
                <p>
                  <Link to='/home/setup'>
                    <button id="setUp">
                      <span><MdPersonAdd/></span>Setup
                    </button>
                  </Link>
                </p>
              ) :
              (
                <p>
                  <Link to='/home/profile'>
                    <button id="profile">
                      <span><MdPeople/></span>Profile
                    </button>
                  </Link>
                </p>
              )
            }

          </div>
        </div>
      </div>
    );
  }
};

Sidebar.propTypes = {
  changeSelect: propTypes.func
};

export default Sidebar;
