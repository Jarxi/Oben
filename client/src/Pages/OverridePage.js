import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import SubmissionTable from '../Components/SubmissionTable';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/SubmissionPage.css';

class OverridePage extends React.Component {
  handleChange = date => {
    this.setState({
      startDate: date,
      currUserSubmissions: []
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }

  componentDidMount(){
    this.fetchSubmissions();
  }

  fetchSubmissions(){
    const url = "http://localhost:3000/api/submission/getAll";
    const options = {headers: { authorization: 'Bearer ' + sessionStorage.getItem('token') }};
    axios.get(url, options).then((res)=>{
        if(res.status === 200){
            console.log(res.data.submissions);
            this.setState({
              allSubmissions: res.data.submissions,
              isfetching: false,
            })
        }
    }).catch((e)=>{
        console.log(e)
        console.log('Get all submissions failed')
    });
  }

  render() {
    return (
      <div class='row'>
        <div class='datePick'>
          <DatePicker
            inline={true}
            selected={this.state.startDate}
            onChange={(date)=>this.setState({startDate:date})}
          />
        </div>
        <SubmissionTable
          firstDay={moment(this.state.startDate).startOf('week')}
          submissions={this.state.currUserSubmissions}
        />
      </div>
    );
  }
}

export default OverridePage;
