import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class EmployeeList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedEmployee: null,
        };
        this.handleEmployeeSelect = this.handleEmployeeSelect.bind(this);
    }

    handleEmployeeSelect(employee){
        this.setState({selectedEmployee:employee})
        this.props.selectCallback(employee)
    }

    render(){
        // Hardcoded users info format!
        // TODO: Backend API return registered User Info
        const users = [
            {name: 'Yichun Lu', email: 'qqwwerr@gmail.com'},
            {name: 'Qiusi Li', email: '3432f@gmail.com'},
        ];

        return(
            <div id="EmployeeList" class="list-group bootstrap-iso">
                {users.map(user => <button type="button" class="list-group-item list-group-item-action" onClick={() => this.handleEmployeeSelect(user)}>{user.name}</button>)}
            </div>
        )
    }
}

export default EmployeeList;