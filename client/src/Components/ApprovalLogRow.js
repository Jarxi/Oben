import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import { ListGroup, Row, Col } from 'react-bootstrap';

class ApprovalLogRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { submitter_name, type, status, _id } = this.props.submissionData;
    
    console.log(this.props.submissionData)
    
    return (
        <ListGroup.Item action onClick={()=>this.props.selectCallback(this.props.submissionData)} 
        className='submissionListItem'>
          {/* <td>{submitter_name}</td>
          <td>{type}</td>
          <td>{status}</td> */}
          
          <span className="inner">{submitter_name}</span>
          <span className="inner">{type}</span>
          <span className="inner">{status}</span>
        </ListGroup.Item>
    );
  }
}

export default ApprovalLogRow;
