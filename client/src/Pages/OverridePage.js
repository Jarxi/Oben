import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import OverrideTable from '../Components/OverrideTable';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/SubmissionPage.css';

class OverridePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      currUserSubmissions: [],
      userList:[],
      selectedUserName:''
    };
    this.userSelect = this.userSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount(){
    this.fetchSubmissions();
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.get("http://localhost:3000/api/user/users",config)
        .then(
            (res) => {
                console.log(res)
                let user = res.data.users;
                this.setState({
                    userList: user
                });

            },
            (error) => {
                console.log(error);
            }
            )
  }

  userSelect(){
    const res = this.state.allSubmissions.filter(submission => submission.submitter_name === "Good User")
    this.setState({
      currUserSubmissions: [...res]
    })
  }
  
  handleSelect(e){
    this.setState({
        selectedUserName: e.target.value
    })
  }

  fetchSubmissions(){
    const url = "http://localhost:3000/api/submission/getAll";
    const options = {
      headers: { 
        authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    };
    axios.get(url, options).then((res)=>{
        if(res.status === 200){
            console.log(res.data.submissions)
            this.setState({
              allSubmissions: res.data.submissions,
              isfetching: false,
            }, console.log("FETCH COMPLETE", this.state.allSubmissions))
        }
    }).catch((e)=>{
        console.log(e)
        console.log('Get all submissions failed')
    });
  }

  render() {
    return (
      <div class='row'>
        <div className='chooseTeamAndMember'>
                <select onChange={this.handleSelect}>
                  <option selected='selected'>Select Team Member</option>
                  {this.state.userList.map(user => <option value={user.first_name + " " + user.last_name}>{user.first_name + " " + user.last_name}</option>)}
                </select>
        </div>
        <button onClick={this.userSelect}>select good user</button>
        <div class='datePick'>
          <DatePicker
            inline={true}
            selected={this.state.startDate}
            onChange={(date)=>this.setState({startDate:date})}
          />
        </div>
        <OverrideTable
          firstDay={moment(this.state.startDate).startOf('week')}
          submissions={this.state.currUserSubmissions}
        />
      </div>
    );
  }
}

export default OverridePage;
