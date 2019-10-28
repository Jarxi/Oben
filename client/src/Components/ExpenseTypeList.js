import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class ExpenseTypeList extends React.Component{

    render(){
        // Hardcoded users info format!
        // TODO: Backend API return registered User Info
        const ExpenseType = [
            {name: 'Travel', email: 'qqwwerr@gmail.com'},
            {name: 'Breakfast', email: '3432f@gmail.com'},
        ];

        return(
            <ul id="EmployeeList" class="list-group bootstrap-iso">
                {ExpenseType.map(expense => <li class="list-group-item list-group-item-light"><a href="#" >{expense.name}</a></li>)}
            </ul>
        )
    }
}

export default ExpenseTypeList;