import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../CSS/SignInForm.css';
import landingImg from '../img/landing.jpg';
class SignInForm extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loginfail: false,
      redirectToReferrer: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_ENDPOINT + '/api/auth/signin';
    const params = {
      email: this.state.username,
      password: this.state.password
    };
    axios
      .post(url, params)
      .then(res => {
        if (res.status === 200) {
          sessionStorage.setItem('loggedin', 'true');
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('user_type', res.data.user.user_type);
          sessionStorage.setItem('user_id', res.data.user._id);
          this.setState({
            loginfail: false,
            redirectToReferrer: true
          });
        }
      })
      .catch(e => {
        console.log('Sign in failed');
        this.setState({
          loginfail: true
        });
      });
  }

  render() {
    let banner;
    if (this.state.loginfail) {
      banner = <div class='Banner'>Invalid email or password</div>;
    }
    const { from } = this.props.location.state || {
      from: { pathname: '/home' }
    };
    if (this.state.redirectToReferrer) {
      console.log(from);
      return <Redirect to={from} />;
    }
    return (
      <div className='SignInContainer'>
        <div className='App__Aside'>
          <img src={landingImg} alt='' />
        </div>
        <div className='App__Form'>
          <div className='FormTitle'>Records Management System</div>
          <form className='FormFields' onSubmit={this.handleSubmit}>
            <Link to='/signup'>
              <button className='Signup_button'>Sign Up</button>
            </Link>
            <div className='FormField'>
              <div class='circle'>Or</div>
            </div>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='username'>
                Email Address
              </label>
              <input
                type='text'
                id='username'
                className='FormField__Input'
                placeholder='Enter your email address'
                name='username'
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className='FormField'>
              <label className='FormField__Label' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='FormField__Input'
                placeholder='Enter your pasword'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            {banner}

            <div className='FormField'>
              <button className='FormField__Button'>Log in</button>
              <a href='#' className='FormField__Link'>
                Forget your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignInForm;
