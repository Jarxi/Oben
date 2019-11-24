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
        <ListGroup.Item action onClick={alertClicked} className='submissionListItem'>
          {/* <td>{name}</td>
          <td>{dateType}</td>
          <td>{status}</td> */}
          <td> {name}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{dateType}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{status} </td>
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
