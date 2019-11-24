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

    // console.log(this.props.submissionData)

    return (
        <ListGroup.Item action onClick={()=>this.props.selectCallback(this.props.submissionData)}
        className='submissionListItem'>
          <div className='wrapper'>
            <div className='column'>{submitter_name}</div>
            <div className='column'>{type}</div>
            <div className='column'>{status}</div>
          </div>
        </ListGroup.Item>
    );
  }
}

export default ApprovalLogRow;
