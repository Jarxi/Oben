import React from 'react';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import '../CSS/SubmissionTable.css';
import ApprovalLogRow from './ApprovalLogRow';
import { Table, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

class ApprovalLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: []
    };
    this.fetchSubmissions = this.fetchSubmissions.bind(this);
  }

  componentDidMount() {
    this.fetchSubmissions();
  }

  fetchSubmissions() {
    let submissionList = [];
    const url = "http://localhost:3000/api/submission/getAll";
    const options = {headers: { authorization: 'Bearer ' + sessionStorage.getItem('token') }};
    axios.get(url, options).then((res)=>{
        if(res.status === 200){
            this.setState({submissions: res.data.submissions});
        }
      })
      .catch(e => {
        console.log(e);
        console.log('Get all submissions failed');
      });
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
                <td colspan='3'>
                  <div className='wrapper' style={{ margin: '10px 0px' }}>
                    <div className='column'>Name</div>
                    <div className='column'>Type</div>
                    <div className='column'>Status</div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <ListGroup variant='flush'>
                {this.state.submissions.map(submission => (
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
