import React from 'react';
import SetUpPageTopNav from '../Components/SetUpPageTopNav';
import EditTeamMember from '../Components/EditTeamMember';
import InviteForm from '../Components/InviteForm';
import EditExpense from '../Components/EditExpense';
import EditProject from '../Components/EditProject';
import '../CSS/SetUpPage.css';

class SetUpPage extends React.Component {
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            selected: "ITM"
        }
    }

    handleSelect(item) {
        this.setState({
            selected: item
        })
    }

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

export default SetUpPage;