import React from 'react';
import { MdPersonOutline, MdPersonAdd } from "react-icons/md";
import { TiThumbsUp } from "react-icons/ti";
import { FaAddressBook, FaChartBar } from "react-icons/fa";
import '../CSS/Home.css'

class Sidebar extends React.Component {
  constructor(){
    super();
    
  }

  render(){

    return (
      <div class="sidebar">
        <div class="overview">
          <h3><span><MdPersonOutline/></span>Overview</h3>
        </div>
        <hr/>
        <div class="nav_links">
          <div class="submission">
            <h3>Submission</h3>
            <p><span><FaAddressBook/></span>Override</p>
            <p><span><TiThumbsUp/></span>Approval</p>
          </div>

          <div class="reports">
            <h3>Reports</h3>
            <p><span><FaChartBar/></span>Time and Expense</p>
          </div>

          <div class="manage">
            <h3>Manage</h3>
            <p class="HARD_CODE_SHADE"><span><MdPersonAdd/></span>Setup</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;