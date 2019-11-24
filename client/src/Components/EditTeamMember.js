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
      teams: ['Engineering', 'Marketing', 'Oben']
    };
  }
  render() {
    return (
      <div class='canvas'>
        <div className='title'>Create Team Names</div>
        <div className='wrapper'>
          {this.state.teams.map(team => (
            <button className='teamName btn' key={team}>
              {team}
            </button>
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
            <EmployeeList />
          </div>
        </div>
        <div class='UserInfo'>
          <p class='ListTitle'>For Later Use to display UserInfo</p>
        </div>
      </div>
    );
  }
}

export default EditTeamMember;
