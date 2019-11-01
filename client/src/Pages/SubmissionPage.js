import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import SubmissionTable from "../Components/SubmissionTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/SubmissionPage.css";

class SubmissionPage extends React.Component {

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props){
    super(props)
    this.state = {
      startDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render(){
    return (
        <div class="row">
          <div class='datePick'>
            <DatePicker
                inline = {true}
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
          </div>
          <SubmissionTable/>
        </div>
    );
  }
};

export default SubmissionPage;
