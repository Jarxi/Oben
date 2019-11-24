import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import { ListGroup } from 'react-bootstrap';

class ApprovalLogRow extends React.Component {
  constructor(props) {
    super(props);
    this.getNameById = this.getNameById.bind(this)
  }


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
    );
  }
}

export default ApprovalLogRow;
