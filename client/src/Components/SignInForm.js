import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

class SignInForm extends React.Component {
    constructor(){
        super();
        
        this.state = {
            username: '',
            password: '',
            loginfail:false

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
        };
        axios.post(url,params).then((res)=>{
            console.log(res)
            if(res.status == 200){
                this.setState({
                    loginfail: false
                })
                alert("Log In Success")
            }
        }).catch((e)=>{
            console.log("Sign in failed")
            this.setState({
                loginfail: true
            })
        })

    }

    render(){
        let banner;
        if(this.state.loginfail){
            banner = <div class="Banner">Invalid email or password</div>
        }
        return (
            <form className="FormFields" onSubmit={this.handleSubmit}>
                <Link to="/signup"><button className="Signup_button">Sign Up</button></Link>
                <div className="FormField">
                    <div class="circle">Or</div>
                </div>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="username">Email Address</label>
                    <input type="text" id="username" className="FormField__Input" placeholder="Enter your email address" 
                    name="username" value={this.state.email} onChange={this.handleChange}/>
                </div>
                
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your pasword" 
                    name="password" value={this.state.password} onChange={this.handleChange}/>
                </div> 

                {banner}
                
                <div className="FormField">
                    <button className="FormField__Button">Log in</button>
                    <a href="#" className="FormField__Link">Forget your password?</a>
                </div>
            </form>
        );
    }
};

export default SignInForm;