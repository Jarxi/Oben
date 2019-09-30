import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/SignUpBox.css';
import axios from 'axios';


class SignInForm extends React.Component {
    constructor(){
        super();
        
        this.state = {
            username:'',
            firstname:'',
            lastname:'',
            password:'',
            confirmPassword:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            {
                [name]: value
            }
        )
    }

    handleSubmit(e){
        e.preventDefault();
        const url = "http://localhost:3000/api/user/signup";
        const params = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            user_type: "Admin"
        }
        axios.post(url, params).then((res)=>{
            if(res.data.code == 200){
                console.log("Registeration Success")
            }
        })
    }

    render(){
        return (
            
            <div className="Container">
                
                <form className="SignUpBox" onSubmit={this.handleSubmit}>
                    <div className="FormFiled">
                        <input type="text" id="username" className="SignUpField__Input" placeholder="Email" 
                        name="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>

                    <div className="FormFiled">
                        <input type="text" id="firstname" className="SignUpField__Input" placeholder="First Name" 
                        name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                    </div>

                    <div className="FormFiled">
                        <input type="text" id="lastname" className="SignUpField__Input" placeholder="Last Name" 
                        name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                    </div>

                    <div className="FormFiled">
                        <input type="password" id="password" className="SignUpField__Input" placeholder="Pasword" 
                        name="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>

                    <div className="FormFiled">
                        <input type="password" id="confirmPassword" className="SignUpField__Input" placeholder="Retype pasword" 
                        name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}/>
                    </div> 

                    <div className="FormField">
                        <button className="SignUpForm__Button">Sign Up</button>
                    </div>
                
                </form>
            </div>
        );
    }
};

export default SignInForm;