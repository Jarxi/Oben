import React from 'react';
import '../CSS/ProfilePage.css';
import '../CSS/bootstrap/css/bootstrap-iso.css'

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name:"Yichun",
            last_name:"Lu",
            email:"yichunlu@usc.edu",
            team:"Engineering",
            job_title: "Engineer",
            supervisor: "John Smith",
            start_date: "2018-01-01",
            phone: "1233211231",
            w9: "Yichun Lu's w9 on file",
            contract: "Yichun Lu's contract on file",
            expire_date: "YYYY/MM/DD"
         };
         this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({expire_date: event.target.value});
    }
    render() {
        const user_type = sessionStorage.getItem('user_type');
        var title;
        var specification;
        if(user_type === 'aic'){
            title = <p>Account In Charge Profile:</p>
        }else if(user_type === 'contractor'){
            title = <p>Contractor Profile:</p>
            specification = <>
            <tr>
            <th scope="row">W9 on File:</th>
            <td><a href="#">{this.state.w9}</a></td>
            </tr>
            <tr>
            <th scope="row">Contract on File:</th>
            <td><a href="#">{this.state.contract}</a></td>
            </tr>
            <tr>
            <th scope="row">Contract Expire on:</th>
            <td><input type="text" value={this.state.expire_date} onChange={this.handleChange}/></td>
            </tr>
            </>
        }else{
            title = <p>Employee Profile:</p>
        }

        return (
            <div className='bootstrap-iso'>
                <div className='ProfileInfoWrapper'>
                    <div className='title'>{title}</div>
                        <table className='table'>
                            <tbody>
                                <tr>
                                <th scope="row">Name:</th>
                                <td>{this.state.last_name + " " + this.state.first_name}</td>
                                </tr>
                                <tr>
                                <th scope="row">Email:</th>
                                <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                <th scope="row">Team:</th>
                                <td>{this.state.team}</td>
                                </tr>
                                <tr>
                                <th scope="row">Job Title:</th>
                                <td>{this.state.job_title}</td>
                                </tr>
                                <tr>
                                <th scope="row">Supervisor:</th>
                                <td>{this.state.supervisor}</td>
                                </tr>
                                <tr>
                                <th scope="row">Start date:</th>
                                <td>{this.state.start_date}</td>
                                </tr>
                                <tr>
                                <th scope="row">Phone:</th>
                                <td>{this.state.phone}</td>
                                </tr>
                                {specification}
                            </tbody>
                        </table>
                    {user_type === 'contractor'? <button type="button" className="btn btn-success inlineButton">Update</button>:null}
                </div>
            </div>
            
            
        );
    }
}

export default ProfileInfo;