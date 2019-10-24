import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class ProjectList extends React.Component{

    render(){
        // Hardcoded users info format!
        // TODO: Backend API return registered User Info
        const Projectlist = [
            {name: 'Text To Speech', email: 'qqwwerr@gmail.com'},
            {name: 'Speech to Sing', email: '3432f@gmail.com'},
        ];

        return(
            <ul id="EmployeeList" class="list-group bootstrap-iso">
                {Projectlist.map(project => <li class="list-group-item list-group-item-light"><a href="#" >{project.name}</a></li>)}
            </ul>
        )
    }
}

export default ProjectList;