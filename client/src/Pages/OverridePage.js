import React, { useState } from 'react';
import moment from 'moment';
import ApprovalTable from '../Components/ApprovalTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SubmissionTable from '../Components/SubmissionTable';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/SubmissionPage.css';
class OverridePage extends React.Component {
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
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
    return (
      <div class='row'>
        <div class='datePick'>
          <DatePicker
            inline={true}
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
        <SubmissionTable
          firstDay={moment(this.state.startDate).startOf('week')}
        />
      </div>
    );
  }
}

export default OverridePage;
