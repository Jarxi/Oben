import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import SubmissionTable from "../Components/SubmissionTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/SubmissionPage.css";

class SubmissionPage extends React.Component {
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props){
    super(props)
    this.state = {
      selected: "overview"
    }
    this.handleItemSelect = this.handleItemSelect.bind(this)
  }

  handleItemSelect(item) {
    this.setState({
      selected: item
    })
  }
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
