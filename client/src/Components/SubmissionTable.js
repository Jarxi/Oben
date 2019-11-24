import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import SubmissionRow from '../Components/SubmissionRow';
import InvoiceInput from '../Components/InvoiceInput';
import ApprovalLog from '../Components/ApprovalLog';
import moment, { relativeTimeThreshold } from 'moment';
import '../CSS/Home.css';
import '../CSS/SubmissionTable.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import AddCircle from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class SubmissionTable extends React.Component {
  constructor(props) {
    super(props);
    // this.ticket_numbers = [1, 2];
    this.timesheetErrorRef = React.createRef();
    this.state = {
      firstDay: moment(),

      timesheet_ticket_numbers: [1],
      timesheet_projects: [''],
      timesheet_rows: [['', '', '', '', '', '', '']],
      timesheet_cols: ['', '', '', '', '', '', ''],
      timesheet_error: '',

      expense_ticket_numbers: [1],
      expense_projects: [''],
      expense_rows: [['', '', '', '', '', '', '']],
      expense_cols: ['', '', '', '', '', '', ''],
      expense_error: ''
    };
    this.onCellChange = this.onCellChange.bind(this);
    this.isFloat = this.isFloat.bind(this);
    this.onError = this.onError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseParam = this.parseParam.bind(this);
  }

  isFloat(value) {
    return (
      !isNaN(value) &&
      parseFloat(Number(value)) == value &&
      !isNaN(parseFloat(value, 10))
    );
  }

  onError(type, message) {
    if (type === 'timesheet') {
      this.setState({ timesheet_error: message });
    } else if (type === 'expense') {
      this.setState({ expense_error: message });
    }
  }
  onCellChange(type, row, col, value) {
    if (type === 'timesheet') {
      if (col === 'project') {
        //TODO: Check the project name should not be 'SELECT'
        let timesheet_projects = this.state.timesheet_projects;
        timesheet_projects[row] = value;
        this.setState({ timesheet_projects });
        return;
      }
      if (value && !this.isFloat(value)) {
        this.onError('timesheet', ' ❌ Please enter a number!');
        return;
      } else {
        this.onError('timesheet', '');
      }
      let timesheet_rows = this.state.timesheet_rows;
      timesheet_rows[row][col] = value;
      this.setState({ timesheet_rows });

      let sum = 0.0;
      for (let i = 0; i < timesheet_rows.length; i++) {
        if (timesheet_rows[i][col] !== '') {
          sum += parseFloat(timesheet_rows[i][col]);
        }
      }
      if (sum === 0) {
        sum = '';
      }
      let timesheet_cols = this.state.timesheet_cols;
      timesheet_cols[col] = sum;
      this.setState({ timesheet_cols: timesheet_cols });
    } else if (type === 'expense') {
      console.log(row, col, value);
      if (col === 'project') {
        let expense_projects = this.state.expense_projects;
        expense_projects[row] = value;
        this.setState({ expense_projects });
        return;
      }
      if (value && !this.isFloat(value)) {
        this.onError('expense', ' ❌ Please enter a number!');
        return;
      } else {
        this.onError('expense', '');
      }
      let expense_rows = this.state.expense_rows;
      expense_rows[row][col] = value;
      this.setState({ expense_rows });

      console.log(expense_rows);
      let sum = 0.0;
      for (let i = 0; i < expense_rows.length; i++) {
        if (expense_rows[i][col] !== '') {
          sum += parseFloat(expense_rows[i][col]);
        }
      }
      if (sum === 0) {
        sum = '';
      }
      let expense_cols = this.state.expense_cols;
      expense_cols[col] = sum;
      this.setState({ expense_cols: expense_cols });
    }
  }

  handleSubmit(type) {
    if (type === 'timesheet') {
      const { timesheet_ticket_numbers } = this.state;
      const newTicketNumber = 1;
        // timesheet_ticket_numbers[timesheet_ticket_numbers.length - 1] + 1;
        let params = this.parseParam(type);
        if(params === null){
            this.onError('timesheet', 'Submit Unseccessful!');
            setTimeout(() => {
                this.onError('timesheet', '');
            }, 2000);
        }else{

        console.log(params);
        const url = 'http://localhost:3000/api/submission/submit';
        const config = {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('token')
          }
        };
        axios
          .post(url, params, config)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              alert('Succeeded in Submit the time!');
              window.location.reload();
            }
          })
          .catch(e => {
            console.log(e);
            console.log('Time Sheet Submission failed');
          });

        this.setState({
          timesheet_ticket_numbers: [newTicketNumber],
          timesheet_rows: [['', '', '', '', '', '', '']],
          timesheet_cols: ['', '', '', '', '', '', '']
        });
        this.onError('timesheet', ' ✅ Submit successful!');
        setTimeout(() => {
          this.onError('timesheet', '');
        }, 2000);
      }
    } else if (type == 'expense') {
        const{expense_ticket_numbers} = this.state;
        const newTicketNumber = 1;
        // expense_ticket_numbers[expense_ticket_numbers.length - 1] + 1;
        let params = this.parseParam(type);
        if(params === null){
            this.onError('expense', 'Submit Unseccessful!');
            setTimeout(() => {
                this.onError('expense', '');
            }, 2000);
        }else{
            const url = 'http://localhost:3000/api/submission/submit';
            const config = {
                headers: {
                authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            };
            axios
                .post(url, params, config)
                .then(res => {
                console.log(res);
                if (res.status === 200) {
                    alert('Succeeded in Submit the expense!');
                    window.location.reload();
                }
                })
                .catch(e => {
                console.log(e);
                console.log('Expense Submission failed');
            });
            this.setState({
                expense_ticket_numbers: [newTicketNumber],
                expense_rows:[['', '', '', '', '', '', '']],
                expense_cols: ['', '', '', '', '', '', '']
            });
            this.onError('expense', ' ✅ Submit successful!');
            setTimeout(() => {
            this.onError('expense', '');
            }, 2000);
        }

    }
  }

  parseParam(type) {
    if (type === 'timesheet') {
      const { firstDay } = this.props;
      let input = [];
      for (let i = 0; i < this.state.timesheet_rows.length; ++i) {
        let dailyTime = [];
        for (let j = 0; j < this.state.timesheet_rows[i].length; ++j) {
          const timesheetFirstDay = moment(firstDay);
          if (
            this.state.timesheet_rows[i][j] === '' ||
            this.state.timesheet_rows[i][j] === 0
          ) {
            continue;
          }
          let param = {
            date: moment(timesheetFirstDay.add(j, 'day')).format('YYYY/MM/DD'),
            amount: this.state.timesheet_rows[i][j]
          };
          console.log(param);
          dailyTime.push(param);
        }
        let inputParam = {
          project_name: this.state.timesheet_projects[i],
          dateAmount: dailyTime
        };
        if (inputParam.project_name === '') {
          alert('No project selected!');
          return null;
        }
        input.push(inputParam);
      }
      let finalParam = {
        input: input,
        type: 'time',
        submitter: sessionStorage.user_id
      };
      return finalParam;
    } else {
      const { firstDay } = this.props;
      let input = [];
      for (let i = 0; i < this.state.expense_rows.length; ++i) {
        let dailyTime = [];
        for (let j = 0; j < this.state.expense_rows[i].length; ++j) {
          const timesheetFirstDay = moment(firstDay);
          if (
            this.state.expense_rows[i][j] === '' ||
            this.state.expense_rows[i][j] === 0
          ) {
            continue;
          }
          let param = {
            date: moment(timesheetFirstDay.add(j, 'day')).format('YYYY/MM/DD'),
            amount: this.state.expense_rows[i][j]
          };
          console.log(param);
          dailyTime.push(param);
        }
        let inputParam = {
          project_name: this.state.expense_projects[i],
          dateAmount: dailyTime
        };
        if (inputParam.project_name === '') {
          alert('No project selected!');
          return null;
        }
        input.push(inputParam);
      }
      let finalParam = {
        input: input,
        type: 'expense',
        submitter: sessionStorage.user_id
      };
      return finalParam;
    }
  }

  addRow(option) {
    if (option === 'timesheet') {
      let { timesheet_ticket_numbers } = this.state;
      timesheet_ticket_numbers.push(timesheet_ticket_numbers.length + 1);
      this.setState({ timesheet_ticket_numbers });

      let { timesheet_rows } = this.state;
      timesheet_rows.push(['', '', '', '', '', '', '']);
      this.setState({ timesheet_rows });

      let { timesheet_projects } = this.state;
      timesheet_projects.push('');
      this.setState({ timesheet_projects });
    } else if (option === 'expense') {
      let { expense_ticket_numbers } = this.state;
      expense_ticket_numbers.push(expense_ticket_numbers.length + 1);
      this.setState({ expense_ticket_numbers });

      let { expense_rows } = this.state;
      expense_rows.push(['', '', '', '', '', '', '']);
      this.setState({ expense_rows });

      let { expense_projects } = this.state;
      expense_projects.push('');
      this.setState({ expense_projects });
    }
  }

  deleteRow(option) {
    if (option === 'timesheet') {
      let { timesheet_ticket_numbers } = this.state;
      timesheet_ticket_numbers.pop();
      this.setState({ timesheet_ticket_numbers });

      let { timesheet_rows } = this.state;
      timesheet_rows.pop();
      this.setState({ timesheet_rows });
    } else if (option === 'expense') {
      let { expense_ticket_numbers } = this.state;
      expense_ticket_numbers.pop();
      this.setState({ expense_ticket_numbers });

      let { expense_rows } = this.state;
      expense_rows.pop();
      this.setState({ expense_rows });
    }
  }

  render() {
    // const ticket_numbers = [1];
    const { firstDay } = this.props;
    const timesheetFirstDay = moment(firstDay);
    const expenseFirstDay = moment(firstDay);
    return (
      <div>
        <div class='submissionSection bootstrap-iso'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' value='' />
            <label class='form-check-label'>Same as last week</label>
          </div>

          <Table bordered>
            <thead>
              <tr>
                <td className='information'>Ticket ID</td>
                <td className='information'>Input Timesheet</td>
                <td className='date'>{timesheetFirstDay.date()}</td>
                <td className='date'>
                  {timesheetFirstDay.add(1, 'day').date()}
                </td>
                <td className='date'>
                  {timesheetFirstDay.add(1, 'day').date()}
                </td>
                <td className='date'>
                  {timesheetFirstDay.add(1, 'day').date()}
                </td>
                <td className='date'>
                  {timesheetFirstDay.add(1, 'day').date()}
                </td>
                <td className='date'>
                  {timesheetFirstDay.add(1, 'day').date()}
                </td>
                <td className='date'>
                  {timesheetFirstDay.add(1, 'day').date()}
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.timesheet_ticket_numbers.map(ticket_number => (
                <SubmissionRow
                  onCellChange={this.onCellChange.bind(
                    this,
                    'timesheet',
                    ticket_number - 1
                  )}
                  ticket_number={ticket_number}
                  key={ticket_number}
                />
              ))}
              <tr>
                <td>
                  <IconButton
                    onClick={this.addRow.bind(this, 'timesheet')}
                    aria-label='add'
                    size='small'
                  >
                    <AddCircle color='primary' fontSize='inherit' />
                  </IconButton>
                  <IconButton
                    onClick={this.deleteRow.bind(this, 'timesheet')}
                    aria-label='delete'
                    size='small'
                  >
                    <Delete color='primary' fontSize='inherit' />
                  </IconButton>
                </td>
                <td>Total Hour</td>
                <td>{this.state.timesheet_cols[0]}</td>
                <td>{this.state.timesheet_cols[1]}</td>
                <td>{this.state.timesheet_cols[2]}</td>
                <td>{this.state.timesheet_cols[3]}</td>
                <td>{this.state.timesheet_cols[4]}</td>
                <td>{this.state.timesheet_cols[5]}</td>
                <td>{this.state.timesheet_cols[6]}</td>
              </tr>
            </tbody>
          </Table>
          <div className='submit_button'>
            <button
              type='button'
              class='btn btn-success'
              onClick={() => this.handleSubmit('timesheet')}
            >
              Submit
            </button>
          </div>
          <div className='error_message'>
            <p> {this.state.timesheet_error}</p>
          </div>
        </div>
        {sessionStorage.getItem('user_type') !== 'contractor' ? (
          <div className='submissionSection bootstrap-iso'>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' value='' />
              <label className='form-check-label'>Same as last week</label>
            </div>

            <Table bordered>
              <thead>
                <tr>
                  <td className='information'>Ticket ID</td>
                  <td className='information'>Input Expense</td>
                  <td className='date'>{expenseFirstDay.date()}</td>
                  <td className='date'>
                    {expenseFirstDay.add(1, 'day').date()}
                  </td>
                  <td className='date'>
                    {expenseFirstDay.add(1, 'day').date()}
                  </td>
                  <td className='date'>
                    {expenseFirstDay.add(1, 'day').date()}
                  </td>
                  <td className='date'>
                    {expenseFirstDay.add(1, 'day').date()}
                  </td>
                  <td className='date'>
                    {expenseFirstDay.add(1, 'day').date()}
                  </td>
                  <td className='date'>
                    {expenseFirstDay.add(1, 'day').date()}
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.expense_ticket_numbers.map(ticket_number => (
                  <SubmissionRow
                    onCellChange={this.onCellChange.bind(
                      this,
                      'expense',
                      ticket_number - 1
                    )}
                    ticket_number={ticket_number}
                    key={ticket_number}
                  />
                ))}
                <tr>
                  <td>
                    <IconButton
                      onClick={this.addRow.bind(this, 'expense')}
                      aria-label='delete'
                      size='small'
                    >
                      <AddCircle color='primary' fontSize='inherit' />
                    </IconButton>
                    <IconButton
                      onClick={this.deleteRow.bind(this, 'expense')}
                      aria-label='delete'
                      size='small'
                    >
                      <Delete color='primary' fontSize='inherit' />
                    </IconButton>
                  </td>
                  <td>Total Expense</td>
                  <td>{this.state.expense_cols[0]}</td>
                  <td>{this.state.expense_cols[1]}</td>
                  <td>{this.state.expense_cols[2]}</td>
                  <td>{this.state.expense_cols[3]}</td>
                  <td>{this.state.expense_cols[4]}</td>
                  <td>{this.state.expense_cols[5]}</td>
                  <td>{this.state.expense_cols[6]}</td>
                </tr>
              </tbody>
            </Table>
            <div className='submit_button'>
              <button
                type='button'
                className='btn btn-success'
                onClick={() => this.handleSubmit('expense')}
              >
                Submit
              </button>
            </div>
            <div className='error_message'>
              <p>{this.state.expense_error}</p>
            </div>
          </div>
        ) : <InvoiceInput/>}
      </div>
    );
  }
}

SubmissionTable.propTypes = {
  firstDay: PropTypes.instanceOf(moment).isRequired
};
export default SubmissionTable;
