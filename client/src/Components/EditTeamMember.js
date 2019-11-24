import React from 'react';
import EmployeeList from './EmployeeList';

import '../CSS/EditTeamMember.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import AddCircle from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class EditTeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedemployee: null,
      teams: ['engineering', 'marketing']
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(item) {
    this.setState({
      selectedemployee: item
    });
  }

  render() {
    return (
      <div class='canvas'>
        <div className='title'>Create Team Names</div>
        <div className='teams_wrapper'>
          {this.state.teams.map(team => (
            <div>
              <button className='teamName btn' key={team}>
                {team}
              </button>
              <IconButton aria-label='delete' size='small'>
                <Delete color='primary' fontSize='inherit' />
              </IconButton>
            </div>
          ))}
          <div>
            <input type='text' placeholder='new team name' />
          </div>
          <div>
            <IconButton aria-label='delete' size='small'>
              {' '}
              <AddCircle color='primary' fontSize='inherit' />
            </IconButton>
          </div>
        </div>
        <div class='employeeList'>
          <p class='ListTitle'>Name of Employee</p>
          <div class='ListWrapper'>
            <EmployeeList selectCallback={this.handleSelect} />
          </div>
        </div>
        {this.state.selectedemployee == null ? (
          <div></div>
        ) : (
          <form>
            <div id='container'>
              <div className='nested'>
                <div className='title'>{this.state.selectedemployee.name}</div>
                <div className='input'>
                  <div>
                    <label>Team</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Job Title</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Supervisor</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Start Date</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Work Email</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Phone</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='title'>Contract Agreement</div>
                <div className='input'>
                  <div>
                    <label>Contract on file</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='nested'>
                <div className='title'>Contract Status</div>
                <div className='input'>
                  <div>
                    <label>W9 On File</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Contract Expire Date</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='title'>Payment Information</div>
                <div className='input'>
                  <div>
                    <label>Method</label>
                  </div>
                  <div>
                    Check
                    <input
                      type='checkbox'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    ACH
                    <input
                      type='checkbox'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Address</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Address 2</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>City</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>State</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label>Zip</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='input'>
                  <div>
                    <label>Rate Information</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default EditTeamMember;
