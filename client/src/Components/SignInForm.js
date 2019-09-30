import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SignInForm extends React.Component {
    constructor(){
        super();
        
        this.state = {
            username: '',
            password: ''
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

        const url = "http://localhost:3000/api/user/signin";
        const params = {
            email: this.state.username,
            password: this.state.password
        }
    }

    render(){
        return (
            <form className="FormFields" onSubmit={this.handleSubmit}>
                <Link to="/signup"><button className="Signup_button">Sign Up</button></Link>
                <div className="FormFiled">
                    <div class="circle">Or</div>
                </div>
                <div className="FormFiled">
                    <label className="FormField__Label" htmlFor="username">Email Address</label>
                    <input type="text" id="username" className="FormField__Input" placeholder="Enter your email address" 
                    name="username" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div className="FormFiled">
                    <label className="FormField__Label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your pasword" 
                    name="password" value={this.state.password} onChange={this.handleChange}/>
                </div> 
                
                <div className="FormField">
                    <button className="FormField__Button">Log in</button>
                    <a href="#" className="FormField__Link">Forget your password?</a>
                </div>
            </form>
        );
    }
};

export default SignInForm;