import React from 'react';
import axios from 'axios';
import '../CSS/ProfilePage.css';
import '../CSS/bootstrap/css/bootstrap-iso.css'

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name:"",
            last_name:"",
            email:"yichunlu@usc.edu",
            team:"Engineering",
            job_title: "Engineer",
            supervisor: "John Smith",
            start_date: "2018-01-01",
            phone: "1233211231",
            //Specification for Contractor
            w9: "Yichun Lu's w9 on file",
            contract: "Yichun Lu's contract on file",
            expire_date:"",
            //Specification for Employee
            employee_id: 3,
            birthday: "1998/08/21",
            status: "Full-Time",
            past_status: "NA",
            w4: "Yichun Lu's w4.pdf",
            legal_status: "H-1B",
            visa: "2018/12/31",
            insurance: "PPO",
            additional_insured: "Spouse",
            dental: "PPO",
            vision: "PPO",
         };
         this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.get("http://localhost:3000/api/user",config)
        .then(
            (res) => {
                console.log(res)
                let user = res.data.user[0];
                this.setState({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.working_email,
                    team: user.team,
                    job_title: user.job_title,
                    supervisor: user.supervisor,
                    start_date: user.start_date,
                    phone: user.phone,
                    //Specification for Contractor
                    w9: user.w9,
                    contract: user.contract_on_file,
                    expire_date: user.contract_expiration,
                    //Specification for Employee
                    employee_id: user.employee_id,
                    birthday: user.birthday,
                    status: user.status,
                    past_status: user.post_status,
                    w4: user.w4,
                    legal_status: user.legal_status,
                    visa: user.visa_expiration,
                    insurance: user.insurance,
                    additional_insured: user.additional_insured,
                    dental: user.dental,
                    vision: user.vision,
                });

            },
            (error) => {
                console.log(error);
            }
        )
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
            <td><input type="text" value={this.state.expire_date} placeholder={typeof this.state.expire_date == "undefined"?"YYYY/MM/DD":this.state.expire_date}onChange={this.handleChange}/></td>
            </tr>
            </>
        }else{
            title = <p>Employee Profile:</p>
            specification = <>
            <tr>
            <th scope="row">Employee ID:</th>
            <td>{this.state.employee_id}</td>
            </tr>
            <tr>
            <th scope="row">Birthday:</th>
            <td>{this.state.birthday}</td>
            </tr>
            <tr>
            <th scope="row">Status:</th>
            <td>{this.state.status}</td>
            </tr>
            <tr>
            <th scope="row">Past Status:</th>
            <td>{this.state.past_status}</td>
            </tr>
            <tr>
            <th scope="row">W4 on File:</th>
            <td><a href="#">{this.state.w4}</a></td>
            </tr>
            <tr>
            <th scope="row">Legal Status:</th>
            <td>{this.state.legal_status}</td>
            </tr>
            <tr>
            <th scope="row">Visa Expiration:</th>
            <td>{this.state.visa}</td>
            </tr>
            <tr>
            <th scope="row">&nbsp;</th>
            <td></td>
            </tr>
            <tr>
            <th scope="row">Insurance:</th>
            <td>{this.state.insurance}</td>
            </tr>
            <tr>
            <th scope="row">Additional Insured:</th>
            <td>{this.state.additional_insured}</td>
            </tr>
            <tr>
            <th scope="row">Dental:</th>
            <td>{this.state.dental}</td>
            </tr>
            <tr>
            <th scope="row">Vision:</th>
            <td>{this.state.vision}</td>
            </tr>
            </>
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