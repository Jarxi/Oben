import React from 'react';
import '../CSS/SignUpForm.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ResetPasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      oldPassword: '',
      newPassword: '',
      success: false,
      error_message: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
  };
  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_ENDPOINT + '/api/auth/resetPassword';
    const params = {
      email: this.state.email,
      password: this.state.oldPassword,
      new_password: this.state.newPassword
    };
    console.log(params);
    axios
      .post(url, params)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            success: true
          });
          setTimeout(() => {
            this.setState({
              redirect: true
            });
          }, 1000);
        }
      })
      .catch(err => {
        if (err.response !== undefined) {
          this.setState({ error_message: err.response.data.message });
          setTimeout(() => this.setState({ error_message: '' }), 5000);
        }
      });
  }

  render() {
    const resetSuccess = this.state.success;
    let button;
    if (!resetSuccess) {
      button = (
        <div className='FormField'>
          <button className='SignUpForm__Button'>Reset Password</button>
        </div>
      );
    } else {
      button = (
        <div className='Succeed_message'>
          Password resetted. Please login with your new password
        </div>
      );
    }

    return (
      <div>
        <form className='SignUpBox' onSubmit={this.handleSubmit}>
          <div>
            <input
              type='text'
              id='email'
              className='SignUpField__Input'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type='text'
              id='oldPassword'
              className='SignUpField__Input'
              placeholder='Enter your Old Password'
              name='oldPassword'
              value={this.state.oldPassword}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type='password'
              id='newPassword'
              className='SignUpField__Input'
              placeholder='Enter Your New Password'
              name='newPassword'
              value={this.state.newPassword}
              onChange={this.handleChange}
            />
          </div>

          {button}
          {this.renderRedirect()}
        </form>
        <span className='error_message'>{this.state.error_message}</span>
      </div>
    );
  }
}

export default ResetPasswordForm;
