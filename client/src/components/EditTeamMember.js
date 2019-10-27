import React from 'react';
import EmployeeList from './EmployeeList';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';


class EditTeamMember extends React.Component {
  render(){

    return (
        <div class="canvas">
                <div class="employeeList">
                    <p class="ListTitle">Name of Employee: </p>
                    <div class="ListWrapper">
                        <EmployeeList/>
                    </div>

                </div>
                <div class="UserInfo">
                    <p class="ListTitle">For Later Use to display UserInfo</p>
                </div>
            </div>
    );
  }
};

export default EditTeamMember;
