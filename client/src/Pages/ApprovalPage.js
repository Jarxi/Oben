import React, { useState } from 'react';
import moment from 'moment';
import Sidebar from '../Components/Sidebar';
import ApprovalTable from "../Components/ApprovalTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApprovalLog from "../Components/ApprovalLog";
import "../CSS/ApprovalPage.css";
class ApprovalPage extends React.Component {

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };
  constructor(props){
    super(props)
    this.state = {
      startDate: new Date()
    };
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
          <ApprovalLog/>
          <ApprovalTable firstDay={moment(this.state.startDate).startOf('week')}/>
        </div>
    );
  }
};

export default ApprovalPage;
