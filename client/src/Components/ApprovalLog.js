import React from 'react';
import moment from 'moment';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import ApprovalLogRow from './ApprovalLogRow';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
class ApprovalLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [
        {
          id: '123123123123123',
          name: 'abc',
          dateType:
            moment()
              .format('MM/DD')
              .toString() + ' Invoice',
          status: 'submitted'
        }
      ]
    };
  }

  render() {
    return (
      <div className='outside_box'>
        <span style={{ color: '#4651af' }}>
          {this.props.page === 'submission' ? 'Status' : 'Approval Log'}
        </span>
        <div class='box bootstrap-iso'>
          <Table>
            <thead>
              <tr>
                <td className='name'>Name</td>
                <td className='dateType'></td>
                <td className='status'>Status</td>
              </tr>
            </thead>
            <tbody>
              {this.state.submissions.map(submission => (
                <ApprovalLogRow
                  name={submission.name}
                  dateType={submission.dateType}
                  status={submission.status}
                  key={submission.id}
                />
              ))}
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
