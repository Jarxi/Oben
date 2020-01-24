import React from 'react';
import axios from 'axios';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class EmployeeList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedEmployee: null,
            employeeList: [],
        };
        this.handleEmployeeSelect = this.handleEmployeeSelect.bind(this);
    }

    handleEmployeeSelect(employee){
        this.setState({selectedEmployee:employee})
        this.props.selectCallback(employee)
    }

    componentDidMount(){
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.get("http://localhost:3000/api/user/users",config)
        .then(
            (res) => {
                console.log(res)
                let user = res.data.users;
                this.setState({
                    employeeList: user
                });

            },
            (error) => {
                console.log(error);
            }
            )
    }

    render(){
        // Hardcoded users info format!
        // TODO: Backend API return registered User Info
        const users = [
            {name: 'Yichun Lu', email: 'qqwwerr@gmail.com'},
            {name: 'Qiusi Li', email: '3432f@gmail.com'},
        ];
        if(typeof this.state.employeeList[0]!='undefined'){
            // console.log(this.state.employeeList[0].getItem('first_name'))
        }

        return(
            <div id="EmployeeList" class="list-group bootstrap-iso">
                {this.state.employeeList.map(user => <button type="button" class="list-group-item list-group-item-action submissionListItem" onClick={() => this.handleEmployeeSelect(user)}>{user.first_name + " " + user.last_name}</button>)}
            </div>
        )
    }
}

export default EmployeeList;