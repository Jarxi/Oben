import React from 'react';
import EmployeeList from './EmployeeList';

import '../CSS/EditTeamMember.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import AddCircle from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class EditTeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedemployee: null,
      teams: ['engineering', 'marketing'],
      team:"",
      job_title:"",
      supervisor:"",
      start_date:"",
      work_email:"",
      phone:"",
      contract_file: null,
      contract_filename:"",
      contract_encoded_filename:"",
      w9_file: null,
      w9_filename:"",
      w9_encoded_filename:"",
      contract_expire_date:"",
      payment_method:"check",
      address:"",
      address2:"",
      city:"",
      state:"",
      zip:"",
      rate:"",
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleRadioSelect = this.handleRadioSelect.bind(this);
  }

  handleSelect(item) {
    this.setState({
      selectedemployee: item
    });
  }

  handleChange(e){
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
        [name]: value
    })
  }

  handleFileChange(e){
    if(e.target.name === 'contract'){
        this.setState({
            contract_file: e.target.files[0],
            contract_filename: e.target.files[0].name,
        });
    }else{
        this.setState({
            w9_file: e.target.files[0],
            w9_filename: e.target.files[0].name,
        });
    }
  }

  handleRadioSelect(value){       
    this.setState({method: value});
}
  render() {
    return (
      <div class='canvas'>
        <div className='title'>Create Team Names</div>
        <div className='wrapper'>
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
                      value={this.state.team}
                      onChange={this.handleChange}
                      name='team'
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
                      value={this.state.job_title}
                      onChange={this.handleChange}
                      name='job_title'
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
                      value={this.state.supervisor}
                      onChange={this.handleChange}
                      name='supervisor'
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
                      value={this.state.start_date}
                      onChange={this.handleChange}
                      name='start_date'
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
                      value={this.state.work_email}
                      onChange={this.handleChange}
                      name='work_email'
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
                      value={this.state.phone}
                      onChange={this.handleChange}
                      name='phone'
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
                      type='file'
                      name='contract'
                      onChange={this.handleFileChange}
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
                      type='file'
                      name='w9'
                      onChange={this.handleFileChange}
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
                      value={this.state.contract_expire_date}
                      name='contract_expire_date'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='title'>Payment Information</div>
                <div className='input'>
                  <div>
                    <label>Method</label>
                  </div>
                  <RadioGroup style={{height:40+'px',display:'inline-flex',width:'100%'}}value={this.state.payment_method} onChange={ this.handleRadioSelect } horizontal>
                    <RadioButton className="radio" value="check">
                        Check
                    </RadioButton>
                    <RadioButton className="radio" value="ACH">
                        ACH
                    </RadioButton>
                  </RadioGroup>
                </div>
                <div className='input'>
                  <div>
                    <label>Address</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.address}
                      name='address'
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
                      value={this.state.address2}
                      name='address2'
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
                      value={this.state.city}
                      name='city'
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
                      value={this.state.state}
                      name='state'
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label>Zip</label>
                  </div>
                  <div>
                    <input
                      type='text'
                      value={this.state.zip}
                      name='zip'
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
                      value={this.state.rate}
                      name='rate'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='bootstrap-iso'><button type="button" className="btn btn-success inlineButton" onClick={this.handleSave}>Save</button></div>
            </div>
            
            
          </form>
        )}
      </div>
    );
  }
}

export default EditTeamMember;
