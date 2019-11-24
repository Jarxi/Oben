import React, { useState } from 'react';
import moment from 'moment';
import ApprovalTable from '../Components/ApprovalTable';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import ApprovalLog from '../Components/ApprovalLog';
import '../CSS/ApprovalPage.css';

class ApprovalPage extends React.Component {
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      selectedSubmission: 'noselection',
      isfetching: true,
    };
    this.selectCallback = this.selectCallback.bind(this);
    this.fetchSubmissions = this.fetchSubmissions.bind(this);
  }

  selectCallback(submissionData) {
    this.setState({
      selectedSubmission: submissionData
    })
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
      <div>
        { !this.state.isfetching && 
          <div class='row'>
            <ApprovalLog selectCallback={this.selectCallback} allSubmissions={this.state.allSubmissions}/>
            <ApprovalTable
              firstDay={moment(this.state.startDate).startOf('week')}
              selectedSubmission={this.state.selectedSubmission}
              onProcess={this.fetchSubmissions}
            />
          </div>
        }
      </div>
    );
  }
}

export default ApprovalPage;
