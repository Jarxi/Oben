import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import { ListGroup, Row, Col } from 'react-bootstrap';

class ApprovalLogRow extends React.Component {
  constructor(props) {
    super(props);
  }


  

  render() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 9bbffa1d532f66897e40286cbeff1cc8ee339b37
        </ListGroup.Item>
    );
  }
}

export default ApprovalLogRow;
