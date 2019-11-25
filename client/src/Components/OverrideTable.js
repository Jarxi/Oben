import React from 'react';
import { Table, Row, Col, Form } from 'react-bootstrap';
import SubmissionRow from '../Components/SubmissionRow';
import moment from 'moment';
import axios from 'axios';
import '../CSS/Home.css';
import '../CSS/SubmissionTable.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';

class OverrideTable extends React.Component {
  constructor(props) {
    super(props);
    this.returnMessage = React.createRef();
    this.state = {
      
    };

    this.override = this.override.bind(this)
  }

  override(submitterId, type, project_name, date){
      
  }
  

  render() {
    let submissions = this.props.submissions;

    function getWeeklyDateAmount(submittedDateAmount, firstDayofWeek) {
        let weeklyDateAmount = [0, 0, 0, 0, 0, 0, 0];
        submittedDateAmount.forEach(entry => {
          weeklyDateAmount[moment(entry.date).diff(firstDayofWeek, 'days')] =
            entry.amount;
        });
        return weeklyDateAmount;
    }
    
    function getTotalAmount(submittedTotalAmount, firstDayofWeek){
        let weeklyTotalAmount = [0, 0, 0, 0, 0, 0, 0];
        submittedTotalAmount.forEach(
            entry =>
            (weeklyTotalAmount[moment(entry.date).diff(firstDayofWeek, 'days')] =
                entry.amount)
        );
        return weeklyTotalAmount;
    }

    const actionRow = (
      <div className='return_message'>
        <div>
          <button
            type='button'
            className='btn btn-success col'
            onClick={() => this.override(id)}
          >
            Override
          </button>
        </div>
      </div>
    );

    const approvedBanner = (
        <div className='submit_button'>
          <Row>
            <Col lg={{span: 8}}/>
            <Col md={{span:3}}/>
            <Col>
              <h4><span className='badge badge-success col'>Submission Approved</span></h4>
            </Col>
          </Row>
        </div>
    );

    function returnedBanner(note) {
        return (
            <div className='wrapper-right'>
                <div>Message: </div>
                <div className='column-2'>{note}</div>
                <div>
                    <h4>
                    <span className='badge badge-success col'>Submission Returned</span>
                    </h4>
                </div>
            </div>
        )
    };

    return (
        <div class='right_content'>
            {
                submissions.length() === 0 && <h1>No submission found</h1>
            }
            {
                submissions.length() !== 0 && submissions.map(function(submission){
                    const { type, input, status, _id, total_amount, note, submitter } = submission;
                    const firstDay = moment(input[0].dateAmount[0].date).startOf('week');
                    let currDay = moment(firstDay);
                    allDays = [<td className='date'>{currDay.date()}</td>];
                    for (let i = 0; i < 6; ++i) {
                        allDays.push(<td className='date'>{currDay.add(1, 'day').date()}</td>);
                    }
                    total_amount = getTotalAmount(total_amount,firstDay);

                    if(type === 'time'){
                        return (
                        <div className='outer_box'>
                            <span style={{ color: '#4651af' }}>
                                Override Time Sheet
                            </span>
            
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
                                {input.map((ipt, idx) => (
                                    <SubmissionRow
                                        ticket_number={idx + 1}
                                        key={idx + 1}
                                        viewOnly={false}
                                        projectName={ipt.project_name}
                                        weeklyDateAmount={getWeeklyDateAmount(ipt.dateAmount,firstDay)}
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
                            {status === 'pending' && actionRow}
                            {status === 'accepted' && approvedBanner}
                            {status == 'returned' && returnedBanner(note)}
                            </div>
                        </div>
                        )
                    }
                    else if(type === 'expense'){
                        return (
                        <div className='outer_box'>
                            <span style={{ color: '#4651af'}}>
                              Override Expense
                            </span>
              
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
                                  {input.map((ipt, idx) => (
                                    <SubmissionRow
                                      ticket_number={idx + 1}
                                      key={idx + 1}
                                      viewOnly={false}
                                      projectName={ipt.project_name}
                                      weeklyDateAmount={getWeeklyDateAmount(ipt.dateAmount,firstDay)}
                                      onCellChange={this.valueChangeCallback.bind(
                                          this,
                                          ipt.project_name, 
                                          type,
                                          submitter // id

                                          )}
                                    />
                                  ))}
                                  <tr>
                                    <td></td>
                                    <td>Total Expense</td>
                                    <td>
                                      {total_amount[0] == 0 ? '' : `$${total_amount[0]}`}
                                    </td>
                                    <td>
                                      {total_amount[1] == 0 ? '' : `$${total_amount[1]}`}
                                    </td>
                                    <td>
                                      {total_amount[2] == 0 ? '' : `$${total_amount[2]}`}
                                    </td>
                                    <td>
                                      {total_amount[3] == 0 ? '' : `$${total_amount[3]}`}
                                    </td>
                                    <td>
                                      {total_amount[4] == 0 ? '' : `$${total_amount[4]}`}
                                    </td>
                                    <td>
                                      {total_amount[5] == 0 ? '' : `$${total_amount[5]}`}
                                    </td>
                                    <td>
                                      {total_amount[6] == 0 ? '' : `$${total_amount[6]}`}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                              {status === 'pending' && actionRow}
                              {status === 'accepted' && approvedBanner}
                              {status == 'returned' && returnedBanner(note)}
                            </div>
                        </div>
                        )
                    }
                })
            }
        </div>
      )
    );
  }
}

export default OverrideTable;