import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import { ListGroup } from 'react-bootstrap';

class ApprovalLogRow extends React.Component {
  constructor(props) {
    super(props);
    this.getNameById = this.getNameById.bind(this)
  }

<<<<<<< HEAD

  getNameById(id){
    return id.substring(19);
  }

  render() {
    let { submitter, type, status, _id } = this.props.submissionData;
    const name = this.getNameById(submitter)
    console.log(this.props.submissionData)
    
    return (
        <ListGroup.Item action onClick={()=>this.props.selectCallback(this.props.submissionData)} 
        className='submissionListItem'>
          {/* <td>{name}</td>
          <td>{dateType}</td>
          <td>{status}</td> */}
          <td> 
            {name}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            {type}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            {status} 
          </td>
        </ListGroup.Item>
=======
  render() {
    const { name, dateType, status } = this.props;
    function alertClicked() {
      alert('clicked');
    }
    return (
      <ListGroup.Item
        action
        onClick={alertClicked}
        className='submissionListItem'
      >
        <div className='wrapper'>
          <div className='column'>{name}</div>
          <div className='column'>{dateType}</div>
          <div className='column'>{status}</div>
        </div>
      </ListGroup.Item>
>>>>>>> 764678c52d924496f95eef89245cd56320cd4776
    );
  }
}

export default ApprovalLogRow;
