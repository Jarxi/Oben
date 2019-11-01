import React from 'react';
import { MdPersonOutline, MdPersonAdd } from "react-icons/md";
import { TiThumbsUp } from "react-icons/ti";
import { FaAddressBook, FaChartBar } from "react-icons/fa";
import '../CSS/Home.css'

class SubmissionTable extends React.Component {
  constructor(){
    super();
    this.handleClick.bind(this);
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
              <h3>Submission</h3>
              <p>
                <button onClick={() => this.handleClick("override")}>
                  <span><FaAddressBook/></span>Override
                </button>
              </p>
              <p>
                <button onClick={() => this.handleClick("approval")}>
                  <span><TiThumbsUp/></span>Approval
                </button>
              </p>
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
              <p>
                <button id="setUp"onClick={() => this.handleClick("setUp")}>
                  <span><MdPersonAdd/></span>Setup
                </button>
              </p>
            </div>
          </div>
        </div>
    );
  }
};

export default SubmissionTable;
