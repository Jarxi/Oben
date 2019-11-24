import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import Axios from 'axios';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';

class ApprovalLogRow extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    const { name, dateType, status } = this.props;
    function alertClicked(){
      alert("clicked");
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
    );
  }
}

ApprovalLogRow.propTypes = {
  name: PropTypes.string.isRequired,
  dateType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default ApprovalLogRow;
