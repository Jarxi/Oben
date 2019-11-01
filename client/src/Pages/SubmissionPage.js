import React from 'react';
import SetUpPageTopNav from '../Components/SetUpPageTopNav';
import EditTeamMember from '../Components/EditTeamMember';
import InviteForm from '../Components/InviteForm';
import EditExpense from '../Components/EditExpense';
import EditProject from '../Components/EditProject';
import '../CSS/SetUpPage.css';

class SubmissionPage extends React.Component {
  render(){

    return (
        <div className="setUpPage">
          <SetUpPageTopNav selectCallback={this.handleSelect}/>
          <div>
            {this.state.selected === "ITM" && <InviteForm/>}
            {this.state.selected === "ETM" && <EditTeamMember/>}
            {this.state.selected === "EE" && <EditExpense/>}
            {this.state.selected === "EP" && <EditProject/>}
          </div>
        </div>
    )
  }
};

export default SubmissionPage;
