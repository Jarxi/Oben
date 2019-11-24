import React from 'react';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import ApprovalLogRow from './ApprovalLogRow';
import { Table, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

class ApprovalLog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let submissions = this.props.allSubmissions;

    return (
      <div className='outside_box'>
        <span style={{ color: '#4651af' }}>
          {this.props.page === 'submission' ? 'Status' : 'Approval Log'}
        </span>
        <div class='box bootstrap-iso'>
          <Table>
            <thead>
              <tr>
                <td colspan='3'>
                  <div className='header' style={{ margin: '10px 0px' }}>
                    <div className='column'>Name</div>
                    <div className='column'>Type</div>
                    <div className='column'>Status</div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <ListGroup variant="flush">
                {submissions.map(submission => (
                  <ApprovalLogRow
                    submissionData={submission}
                    selectCallback={this.props.selectCallback}
                  />
                ))}
              </ListGroup>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

ApprovalLog.propTypes = {
  page: PropTypes.string.isRequired
};

export default ApprovalLog;
