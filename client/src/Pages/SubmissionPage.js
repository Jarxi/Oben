import React, { useState } from 'react';
import moment from 'moment';
import Sidebar from '../Components/Sidebar';
import SubmissionTable from '../Components/SubmissionTable';
import ApprovalLog from '../Components/ApprovalLog';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/SubmissionPage.css';
class SubmissionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    // console.log(sessionStorage);
    return (
      <div class='row'>
        <div className='col left-col'>
          <div class='datePick'>
            <DatePicker
              inline={true}
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>
          <ApprovalLog page={'submission'} />
        </div>
        <div className='col'>
          <SubmissionTable
            firstDay={moment(this.state.startDate).startOf('week')}
          />
        </div>
      </div>
    );
  }
}

export default SubmissionPage;
