import React from 'react';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import '../CSS/SetUpPage.css';
import generator from 'generate-password';
import axios from 'axios';
import InvitationStatusBox from '../Components/InvitationStatusBox';
import { FaUserCheck } from 'react-icons/fa';

class InviteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: generator.generate(),
      type: 'employee',
      users: [],
      error_message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers() {
    let userList = {};
    const url = 'http://localhost:3000/api/user/users';
    const options = {
      headers: { authorization: 'Bearer ' + sessionStorage.getItem('token') }
    };
    axios
      .get(url, options)
      .then(res => {
        if (res.status === 200) {
          userList = res.data.users
            .filter(user => user.user_type !== 'aic')
            .map(function(user) {
              return {
                name: user.first_name + ' ' + user.last_name,
                email: user.email,
                type: user.user_type,
                invitationStatus: user.invitation || 'pending'
              };
            });
          this.setState({ users: userList });
        }
      })
      .catch(e => {
        console.log(e);
        console.log('Get all users failed');
      });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const url = 'http://localhost:3000/api/auth/signup';
    const nameSplit = this.state.name.split(/(\s+)/);
    console.log(nameSplit);
    const firstName = nameSplit[0];
    const lastName =
      nameSplit.length === 1 ? '' : nameSplit[nameSplit.length - 1];
    const params = {
      email: this.state.email,
      password: this.state.password,
      first_name: firstName,
      last_name: lastName,
      user_type: this.state.type
    };
    this.setState({
      name: '',
      email: '',
      password: generator.generate()
    });
    axios
      .post(url, params)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            success: true,
            name: '',
            email: '',
            password: generator.generate(),
            type: 'employee'
          });
          this.fetchUsers();
        }
      })
      .catch(err => {
        this.setState({ error_message: err.response.data.message });
        setTimeout(() => this.setState({ error_message: '' }), 5000);
      });
  }

  render() {
    if (typeof this.state.users === 'undefined') {
      return null;
    }
    return (
      <div>
        <div id='invite-form' className='invite-form bootstrap-iso'>
          <div className='form-group'>
            <label>Individual Invite</label>
          </div>
          <div className='form-group'>
            <label className='Form_Label'>Name:</label>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-group'>
            <label className='Form_Label'>Email:</label>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-group'>
            <label className='Form_Label'>Temp Password:</label>
            <input
              type='text'
              id='password'
              className='form-control'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div class='btn-group form-group' role='group' aria-label='...'>
            <button
              type='button'
              name='type'
              value='employee'
              onClick={this.handleChange}
              class='btn btn-default'
            >
              Employee
            </button>
            <button
              type='button'
              name='type'
              value='contractor'
              onClick={this.handleChange}
              class='btn btn-default'
            >
              Contractor
            </button>
          </div>

          <div className='form-group'>
            <button
              onClick={this.handleSubmit}
              className='btn btn-success btn-block'
            >
              Invite
            </button>
            <div className='error_message'>{this.state.error_message}</div>
          </div>
        </div>
        <InvitationStatusBox
          className='invitationStatusBox'
          users={this.state.users}
        />
      </div>
    );
  }
}

export default InviteForm;
