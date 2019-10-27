import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class EmployeeList extends React.Component{

    render(){
        // Hardcoded users info format!
        // TODO: Backend API return registered User Info
        const users = [
            {name: 'Yichun Lu', email: 'qqwwerr@gmail.com'},
            {name: 'Qiusi Li', email: '3432f@gmail.com'},
        ];

        return(
            <ul id="EmployeeList" class="list-group bootstrap-iso">
                {users.map(user => <li class="list-group-item list-group-item-light"><a href="#" >{user.name}</a></li>)}
            </ul>
        )
    }
}

export default EmployeeList;