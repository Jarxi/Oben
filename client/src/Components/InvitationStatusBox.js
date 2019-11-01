import React from 'react'
import '../CSS/bootstrap/css/bootstrap-iso.css'
import '../CSS/SetUpPage.css';

class InvitationStatusBox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: this.props.users
        }
    }
    render(){
        const users = this.props.users;
        return(
            <div className="bootstrap-iso invitationStatusBox">
                <table className="table table-striped">
                    <thead>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Invitation Status</th>
                    </thead>
                    <tbody>
                    {users.map((user)=>
                            <tr className="table-striped">
                                <td scope="row">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td>{user.invitationStatus}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
        
    }
};

export default InvitationStatusBox;