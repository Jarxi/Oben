import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';


class EditExpenseType extends React.Component {
  render(){

    return (
        <div class = "bootstrap-iso">
            <div className="FormField">
                <label className="FormField__Label">New Expense Name</label>
                <input type="text" id="username" className="FormField__Input" placeholder="Enter the name of new expense" 
                        name="username"/>
            </div>

            <div class="informButton">
                <button type="button" class="btn btn-success">Add</button>
            </div>
        </div>
    );
  }
};

export default EditExpenseType;