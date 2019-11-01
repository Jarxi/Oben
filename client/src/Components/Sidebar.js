import React from 'react';
import { MdPersonOutline, MdPersonAdd, MdAssignment, MdPeople} from "react-icons/md";
import { TiThumbsUp } from "react-icons/ti";
import { FaAddressBook, FaChartBar } from "react-icons/fa";
import '../CSS/Home.css'
import propTypes from 'prop-types'

class Sidebar extends React.Component {
  constructor(){
    super();
    this.handleClick.bind(this);
    this.state = {
      user_type: sessionStorage.getItem('user_type')
      // user_type: 'aic'
    }
  }

  handleClick(item) {
    this.props.selectCallback(item)
  }

  render(){
    
    return (
      <div class="sidebar">
        <button onClick={() => this.handleClick("overview")} class="overview">
          <h3><span ><MdPersonOutline/></span>Overview</h3>
        </button>
        <hr/>
        <div class="nav_links">
          <div class="submission">
            <h3>Tasks</h3>
            {
              this.state.user_type === 'aic' &&
              <p>
                <button onClick={() => this.handleClick("override")}>
                  <span><FaAddressBook/></span>Override
                </button>
              </p>
            }
            {
              this.state.user_type !== 'aic' &&
              <p>
                <button onClick={() => this.handleClick("submission")}>
                  <span><MdAssignment/></span>Submission
                </button>
              </p>
            }
            {
              ['aic', 'team_leader'].includes(this.state.user_type) &&
              <p>
                <button onClick={() => this.handleClick("approval")}>
                  <span><TiThumbsUp/></span>Approval
                </button>
              </p>
            }
            

          </div>
          <div class="reports">
            <h3>Reports</h3>
            <p>
              <button onClick={() => this.handleClick("timeAndExpense")}>
                <span><FaChartBar/></span>Time and Expense
              </button>
            </p>
          </div>
          <div class="manage">
            <h3>Manage</h3>
            {
              this.state.user_type === "aic" ?
              ( 
                <p>
                  <button id="setUp"onClick={() => this.handleClick("setUp")}>
                    <span><MdPersonAdd/></span>Setup
                  </button>
                </p>
              ) :
              (
                <p>
                  <button id="profile"onClick={() => this.handleClick("profile")}>
                    <span><MdPeople/></span>Profile
                  </button>
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
