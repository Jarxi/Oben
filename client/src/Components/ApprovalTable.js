import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Form } from 'react-bootstrap';
import SubmissionRow from '../Components/SubmissionRow';
import moment from 'moment';
import '../CSS/Home.css';
import '../CSS/SubmissionTable.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';

class ApprovalTable extends React.Component {
  constructor(props) {
    super(props);
    // this.ticket_numbers = [1, 2];
    this.timesheetErrorRef = React.createRef();
    this.state = {
      timesheet_ticket_numbers: [1],
      expense_ticket_numbers: [1],
      firstDay: moment(),
      timesheet_rows: [['', '', '', '', '', '', '']],
      expense_rows: [['', '', '', '', '', '', '']],
      timesheet_cols: ['', '', '', '', '', '', ''],
      expense_cols: ['', '', '', '', '', '', ''],
      timesheet_projects: [''],
      expense_projects: [''],
      timesheet_error: '',
      expense_error: '',
    };

    this.onError = this.onError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWeeklyDateAmount = this.getWeeklyDateAmount.bind(this);
    this.getTotalAmount = this.getTotalAmount.bind(this);
  }

  onError(type, message) {
    if (type === 'timesheet') {
      this.setState({ timesheet_error: message });
    } else if (type === 'expense') {
      this.setState({ expense_error: message });
    }
  }

  handleSubmit(type) {
    if (type === 'timesheet') {
      const { timesheet_ticket_numbers } = this.state;
      const newTicketNumber =
        timesheet_ticket_numbers[timesheet_ticket_numbers.length - 1] + 1;
      this.setState({
        timesheet_ticket_numbers: [newTicketNumber],
        timesheet_rows: [['', '', '', '', '', '', '']],
        timesheet_cols: ['', '', '', '', '', '', '']
      });
      this.onError('timesheet', ' ✅ Submit successful!');
      setTimeout(() => {
        this.onError('timesheet', '');
      }, 2000);
    } else if (type == 'expense') {
    }
  }

  getWeeklyDateAmount(submittedDateAmount, firstDayofWeek){
    let weeklyDateAmount = [0, 0, 0, 0, 0, 0, 0];
    submittedDateAmount.forEach(entry => {
      weeklyDateAmount[moment(entry.date).diff(firstDayofWeek,'days')] = entry.amount
    }
    );
    return weeklyDateAmount;
  }

  getTotalAmount(submittedTotalAmount, firstDayofWeek){
    console.log("getTotalAmount", submittedTotalAmount)
    let weeklyTotalAmount = [0, 0, 0, 0, 0, 0, 0];
    submittedTotalAmount.forEach(entry =>
      weeklyTotalAmount[moment(entry.date).diff(firstDayofWeek,'days')] = entry.amount
    );
    return weeklyTotalAmount;
  }

  render() {
    // const ticket_numbers = [1];
    let tableType, status, input, total_amount, firstDay, allDays;
    if(this.props.selectedSubmission !== 'noselection'){
      tableType = this.props.selectedSubmission.type;
      status = this.props.selectedSubmission.status;
      input = this.props.selectedSubmission.input;
      firstDay = moment(input[0].dateAmount[0].date).startOf('week');
      let currDay = moment(firstDay);
      allDays = [<td className='date'>{currDay.date()}</td>]
      for(let i = 0; i < 6; ++i){
        allDays.push(<td className='date'>{currDay.add(1,'day').date()}</td>)
      }
      total_amount = this.getTotalAmount(this.props.selectedSubmission.total_amount,firstDay);
    }
  
    return (
      this.props.selectedSubmission !== 'noselection' &&
      <div>
        { tableType === 'time' &&
        <div className='outer_box'>
          <p className='title'>Time Sheet Approval</p>

          <div class='submissionSection bootstrap-iso'>
            <Table bordered>
              <thead>
                <tr>
                  <td className='information'>Ticket ID</td>
                  <td className='information'>Project</td>
                  {allDays}
                </tr>
              </thead>
              <tbody>
                {input.map((ipt,idx) => (
                  <SubmissionRow
                    ticket_number={idx+1}
                    key={idx+1}
                    viewOnly={true}
                    projectName={ipt.project_name}
                    weeklyDateAmount={this.getWeeklyDateAmount(ipt.dateAmount,firstDay)}
                  />
                ))}
                <tr>
                  <td></td>
                  <td>Total Hour</td>
                  <td>{total_amount[0]}</td>
                  <td>{total_amount[1]}</td>
                  <td>{total_amount[2]}</td>
                  <td>{total_amount[3]}</td>
                  <td>{total_amount[4]}</td>
                  <td>{total_amount[5]}</td>
                  <td>{total_amount[6]}</td>
                </tr>
              </tbody>
            </Table>
            <div className='submit_button'>
              <Row>
                <Col lg={{span: 2}}>
                  <Form.Label>Return Message</Form.Label>
                </Col>
                <Col lg={{span:6}}>
                  <Form.Control placeholder="return message" />
                </Col>
                <Col md={{span:3}}/>
                <Col>
                  <button type='button' className='btn btn-success col'>Approve</button>
                </Col>
                <Col>
                  <button type='button' className='btn btn-danger col'>Return</button>
                </Col>
              </Row>
            </div>
            <div className='error_message'>
              <p> {this.state.timesheet_error}</p>
            </div>
          </div>
        </div>
        }
        { tableType === 'expense' &&
        <div className='outer_box'>
          <p className='title'>Expense Approval</p>
          <div className='submissionSection bootstrap-iso'>
            <Table bordered>
              <thead>
                <tr>
                  <td className='information'>Ticket ID</td>
                  <td className='information'>Project</td>
                  {allDays}
                </tr>
              </thead>
              <tbody>
              {input.map((ipt,idx) => (
                  <SubmissionRow
                    ticket_number={idx+1}
                    key={idx+1}
                    viewOnly={true}
                    projectName={ipt.project_name}
                    weeklyDateAmount={this.getWeeklyDateAmount(ipt.dateAmount,firstDay)}
                  />
                ))}
                <tr>
                  <td></td>
                  <td>Total Expense</td>
                  <td>{total_amount[0] == 0? '' : `$${total_amount[0]}`}</td>
                  <td>{total_amount[1] == 0? '' : `$${total_amount[1]}`}</td>
                  <td>{total_amount[2] == 0? '' : `$${total_amount[2]}`}</td>
                  <td>{total_amount[3] == 0? '' : `$${total_amount[3]}`}</td>
                  <td>{total_amount[4] == 0? '' : `$${total_amount[4]}`}</td>
                  <td>{total_amount[5] == 0? '' : `$${total_amount[5]}`}</td>
                  <td>{total_amount[6] == 0? '' : `$${total_amount[6]}`}</td>
                </tr>
              </tbody>
            </Table>
            <div className='submit_button'>
              <button type='button' className='btn btn-success col'>
                Approve
              </button>
              <button type='button' className='btn btn-danger col'>
                Return
              </button>
            </div>
            <div className='error_message'>
              <p>{this.state.expense_error}</p>
            </div>
          </div>
        </div>
        }
        { tableType === 'invoice' &&
        <div className='outer_box'>
          <p className='title'>Invoice Approval</p>
          <div className='submissionSection bootstrap-iso'>
            <form className='form-inline'>
              <div className='form-group row col-sm-6'>
                <label htmlFor='month' className='col-sm-3 col-form-label '>
                  Month
                </label>
                <div className='col-sm-3'>
                  <input
                    type='text'
                    className='form-control small-input'
                    id='month'
                  />
                </div>
              </div>
              <div className='form-group row col-sm-6'>
                <label htmlFor='invoice_no' className='col-sm-4 col-form-label'>
                  Invoice Number
                </label>
                <div className='col-sm-2'>
                  <input
                    type='text'
                    className='form-control small-input'
                    id='invoice_no'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='total_days' className='col-sm-6 col-form-label'>
                  Total Days in the invoice:
                </label>
                <input
                  type='text'
                  className='form-control col-sm-6'
                  id='total_dyas'
                />
              </div>

              <div className='form-group row'>
                <label
                  htmlFor='total_amount'
                  className='col-sm-6 col-form-label'
                >
                  Total Amount Submitted:
                </label>
                <input
                  type='text'
                  className='form-control col-sm-6'
                  id='total_amount'
                />
              </div>

              <div className='form-group row'>
                <label htmlFor='service' className='col-sm-6 col-form-label'>
                  Nature of Services Provided:
                </label>
                <input
                  type='text'
                  className='form-control col-sm-6'
                  id='service'
                />
              </div>
            </form>

            <div className='submit_button'>
              <button type='button' className='btn btn-success col'>
                Approve
              </button>
              <button type='button' className='btn btn-danger col'>
                Return
              </button>
            </div>
            <div className='error_message'>
              <p>{this.state.expense_error}</p>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

ApprovalTable.propTypes = {
  firstDay: PropTypes.instanceOf(moment).isRequired
};
export default ApprovalTable;
