import React from 'react';
import '../CSS/SignUpForm.css';
import axios from 'axios';

class ResetPasswordForm extends React.Component {
    constructor(){
        super();
        this.state = {
            email:'',
            oldPassword:'',
            newPassword:'',
            success:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();

        const url = "http://localhost:3000/api/auth/resetPassword";
        const params = {
            email: this.state.email,
            password: this.state.oldPassword,
            new_password: this.state.newPassword
        }
        console.log(params)
        axios.post(url, params).then((res)=>{
            if(res.status === 200){
                this.setState({
                    success:true
                })
                setTimeout(()=>{
                    this.props.history.push("/login");
                }, 1000)
            }
        }).catch((err)=>{
            console.log(err)
        })

    }

    render(){
        const resetSuccess = this.state.success;
        let button;
        if(!resetSuccess){
            button = (
                <div className="FormField">
                    <button className="SignUpForm__Button">Reset Password</button>
                </div>
            );
        }
        else{
            button = (
                <div className="Succeed_message">Password resetted. Please login with your new password</div>
            )
        }

        return (
            <div className="Reset_Container">
                <form className="SignUpBox" onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" id="email" className="SignUpField__Input" placeholder="Email"
                        name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type="text" id="oldPassword" className="SignUpField__Input" placeholder="Enter your Old Password"
                        name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type="password" id="newPassword" className="SignUpField__Input" placeholder="Enter Your New Password"
                        name="newPassword" value={this.state.newPassword} onChange={this.handleChange}/>
                    </div>

                    {button}

                </form>
            </div>
        );
    }
};

export default ResetPasswordForm;
