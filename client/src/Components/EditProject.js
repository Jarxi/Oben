import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';
import ProjectList from './ProjectList';
import ProjectDealer from './ProjectDealer';


class EditProject extends React.Component {
    constructor(){
        super();
        this.hanldleSelect = this.hanldleSelect.bind(this);
        this.state = {
            selected: "ADD"
        }

    }

    hanldleSelect(item) {
        this.setState({
            selected: item
        })
    }

    render(){
        return (
            <div class="canvas">
                <div class="PageSubTitle">
                    Existing Project
                </div>
                <div class="employeeList">
                    <div class="ListWrapper">
                        <ProjectList/>
                    </div>
                </div>
                <div class="ButtonWrapper bootstrap-iso">
                    <button type="button" className="btn btn-success inlineButton" onClick={() => this.hanldleSelect("ADD")}>Add</button>
                    <button type="button" className="btn btn-primary inlineButton" onClick={() => this.hanldleSelect("EDIT")}>Edit</button>
                    <button type="button" className="btn btn-danger inlineButton" onClick={() => this.hanldleSelect("DELETE")}>Delete</button>
                </div>
                <div class ="ExpenseInfo">
                    <ProjectDealer selectCallback={this.state.selected}/>
                </div>
            </div>
    );
  }
};

export default EditProject;
