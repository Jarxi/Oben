import React from 'react';
import { Table, Row, Col, Form } from 'react-bootstrap';
import OverrideRow from '../Components/OverrideRow';
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
      changeInValues: [],
      timesheet_message: '',
      expense_message: '',
    };

    this.valueChangeCallback = this.valueChangeCallback.bind(this)
    this.override = this.override.bind(this)
    this.actionRow = this.actionRow.bind(this)
  }

  valueChangeCallback(projectName, type, submitterId, firstDayofWeek, ticketId, offsetFromFirstDay, newValue){
    const dateofChange = moment(firstDayofWeek).add(offsetFromFirstDay, 'day').format('YYYY/MM/DD');
    let oldValue = [...this.state.changeInValues];

    let i;
    for(i = 0; i < oldValue.length; ++i){
        if(oldValue[i].type === type && oldValue[i].user === submitterId){
            let j;
            for(j = 0; j < oldValue[i].input.length; ++j){
                // override value already exists for the given date and project 
                if(oldValue[i].input[j].project_name === projectName && 
                    oldValue[i].input[j].date === dateofChange){
                    oldValue[i].input[j].amount = newValue;
                    this.setState({
                        changeInValues: oldValue 
                    },function(){console.log(this.state.changeInValues);})
                    return;
                }
            }
            // new date or project override entry
            if(j === oldValue[i].input.length){
                oldValue[i].input.push({
                    project_name: projectName,
                    date: dateofChange,
                    amount: newValue
                })
                this.setState({
                    changeInValues: oldValue 
                },function(){console.log(this.state.changeInValues);});
                return;
            }   
        }
    }
    if(i === oldValue.length){
        oldValue.push({
            input: [
                {
                    project_name: projectName,
                    date: dateofChange,
                    amount: newValue
                }
            ],
            type: type,
            user: submitterId
        })
    }

    this.setState({
        changeInValues: oldValue 
    },function(){console.log(this.state.changeInValues);})
    
  }

  override(type){
    let { changeInValues } = this.state;
    const config = {
        headers: {
          authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
    };
    const url = "http://localhost:3000/api/submission/update";
    let removeIdx = 0;
    for(let i = 0; i < changeInValues.length; ++i){
        // only submit the requested table i.e. time XOR expense
        const param = changeInValues[i];
        if(param.type === type){
            removeIdx = i;
            axios
            .put(url,param,config)
            .then((res)=>{
                console.log(res)
                if(res.status === 200){
                    if(type==='expense'){
                        this.setState({
                            expense_message: '✅ Override successful!'
                        })
                        setTimeout(() => {
                            this.setState({
                                expense_message: ''
                            })
                        }, 2000);
                    }else if(type === 'time'){
                        this.setState({
                            timesheet_message: '✅ Override successful!'
                        })
                        setTimeout(() => {
                            this.setState({
                                timesheet_message: ''
                            })
                        }, 2000);
                    }
                }
            })
            .catch(e => {
                console.log(e);
                console.log('Override failed');
            });
        }    
    }
    changeInValues.splice(removeIdx,1);
  }

  actionRow(type) {
    return (
         <div>
             <span>
             <button
                 type='button'
                 className='btn btn-success col'
                 onClick={() => this.override(type)}
             >
                 Override
             </button>
             </span>
             <span className='error_message'>
             {
                 type === "time" && 
                 <p> {this.state.timesheet_message}</p>
             }
             {
                 type === "expense" &&
                 <p> {this.state.expense_message}</p>
             }
             </span>
         </div>)
 };
  

  render() {
    let submissions = this.props.submissions;

    submissions = submissions.filter(s => s.input[0].dateAmount[0].date === this.props.firstDay.format('YYYY/MM/DD'))
    
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

    const noSelection = (
        
        <div className='noSectionBox'>
            <div className='banner'>Select Week And Team Member to Override</div>
        </div>
    );

    return (
        <div class='right_content'>
            {
                submissions.length === 0 && noSelection
            }
            {
                submissions.length !== 0 && submissions.map(function(submission){
                    let { type, input, status, _id, total_amount, note, submitter } = submission;
                    const firstDay = moment(input[0].dateAmount[0].date).startOf('week');
                    let currDay = moment(firstDay);
                    let allDays = [<td className='date'>{currDay.date()}</td>];
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
                                    <OverrideRow
                                        ticket_number={idx + 1}
                                        key={idx + 1}
                                        projectName={ipt.project_name}
                                        weeklyDateAmount={getWeeklyDateAmount(ipt.dateAmount,firstDay)}
                                        onCellChange={this.valueChangeCallback.bind(
                                            this,
                                            ipt.project_name, 
                                            'time',
                                            submitter, // id
                                            firstDay,
                                            _id
                                          )}                                       
                                    />
                                ))}
                                {/* <tr>
                                    <td></td>
                                    <td>Total Hour</td>
                                    <td>{total_amount[0]}</td>
                                    <td>{total_amount[1]}</td>
                                    <td>{total_amount[2]}</td>
                                    <td>{total_amount[3]}</td>
                                    <td>{total_amount[4]}</td>
                                    <td>{total_amount[5]}</td>
                                    <td>{total_amount[6]}</td>
                                </tr> */}
                                </tbody>
                            </Table>
                            {status === 'pending' && this.actionRow('time')}
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
                                    <OverrideRow
                                      ticket_number={idx + 1}
                                      key={idx + 1}
                                      projectName={ipt.project_name}
                                      weeklyDateAmount={getWeeklyDateAmount(ipt.dateAmount,firstDay)}
                                      onCellChange={this.valueChangeCallback.bind(
                                          this,
                                          ipt.project_name, 
                                          'expense',
                                          submitter, // id
                                          firstDay,
                                          _id
                                        )}
                                    />
                                  ))}
                                  {/* <tr>
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
                                  </tr> */}
                                </tbody>
                              </Table>
                              {status === 'pending' && this.actionRow('expense')}
                              {status === 'accepted' && approvedBanner}
                              {status == 'returned' && returnedBanner(note)}
                            </div>
                        </div>
                        )
                    }
                }, this)
            }
        </div>
    );
  }
}

export default OverrideTable;