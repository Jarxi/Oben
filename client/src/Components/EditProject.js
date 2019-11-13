import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';
import ProjectList from './ProjectList';
import ProjectDealer from './ProjectDealer';


class EditProject extends React.Component {
    constructor(){
        super();
        this.state = {
            selected: "ADD"
        }
        this.hanldleSelect = this.hanldleSelect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

    }

    hanldleSelect(item) {
        this.setState({
            selected: item
        })
    }

    handleUpdate(){
        console.log("handleupdate In EditProject");
        this.refs.child.fetchProject();
    }

    render(){
        console.log(this.state)
        return (
            <div class="canvas">
                <div class="PageSubTitle">
                    Existing Project
                </div>
                <div class="employeeList">
                    <div class="ListWrapper">
                        <ProjectList ref="child" selectCallback={this.hanldleSelect}/>
                    </div>
                </div>
                <div class="ButtonWrapper bootstrap-iso">
                    <button type="button" className="btn btn-success inlineButton" onClick={() => this.hanldleSelect("ADD")}>Add</button>
                    <button type="button" className="btn btn-primary inlineButton" onClick={() => this.hanldleSelect("EDIT")}>Edit</button>
                    <button type="button" className="btn btn-danger inlineButton" onClick={() => this.hanldleSelect("DELETE")}>Delete</button>
                </div>
                <div class ="ExpenseInfo">
                    <ProjectDealer selectCallback={this.state.selected} triggerUpdate={this.handleUpdate}/>
                </div>
            </div>
    );
  }
};

export default EditProject;
