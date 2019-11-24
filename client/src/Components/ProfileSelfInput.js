import React from 'react';
import axios from 'axios';
import '../CSS/ProfilePage.css';
import '../CSS/bootstrap/css/bootstrap-iso.css'

class ProfileSelfInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            language: "",
            degree:"",
            graduation:"",
            certification:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelfInputSubmit = this.handleSelfInputSubmit.bind(this);
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
                let user = res.data.user[0];
                this.setState({
                    language: user.language,
                    degree: user.highest_degree,
                    graduation: user.graduation,
                    certification: user.certification
                });

            },
            (error) => {
                console.log(error);
            }
        )
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSelfInputSubmit(e){
        //TODO: Connect the editing profile for employer
        const param = {
            language: this.state.language,
            highest_degree: this.state.degree,
            graduation: this.state.graduation,
            certification: this.state.certification
        };

        const configpost = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };

        const url = "http://localhost:3000/api/user/userInfo";
        axios.put(url,param,configpost).then((res)=>{
            console.log(res)
            if(res.status === 200){
                alert("Succeed in updating info")
            }
            }
    
        ).catch((e)=>{
            console.log(e)
            console.log("Update Info failed")
        })
    }

    render() {
        return (
            <div className='bootstrap-iso'>
                <div className='ProfileInfoWrapper'>
                    <div className='title'>Optional For Employee Self Input:</div>
                    <table className='table'>
                        <tbody>
                            <tr>
                            <th scope="row">Language:</th>
                            <td><input type="text" id="language" className="paymentInput" placeholder={typeof this.state.language =="undefined"?'Chinese/English/Spanish/...':this.state.language}
                        name="language" value={this.state.language} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Highest Degree:</th>
                            <td><input type="text" id="degree" className="paymentInput" placeholder={typeof this.state.degree =="undefined"?"PHD in Accounting":this.state.degree}
                        name="degree" value={this.state.degree} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Graduation:</th>
                            <td><input type="text" id="graduation" className="paymentInput" placeholder={typeof this.state.graduation == "undefined"?"YYYY/MM/DD":this.state.graduation}
                        name="graduation" value={this.state.graduation} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Certification</th>
                            <td><input type="text" id="certification" className="paymentInput" placeholder={typeof this.state.certification == "undefined"?"CFA/CPA":this.state.certification}
                        name="certification" value={this.state.certification} onChange={this.handleChange}/></td>
                            </tr>

                            
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success inlineButton" onClick={this.handleSelfInputSubmit}>Update</button>
                </div>
            </div>
        );
    }
}

export default ProfileSelfInput;