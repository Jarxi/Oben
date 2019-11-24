import React from 'react';
import moment from 'moment';
import '../CSS/bootstrap/css/bootstrap-iso.css';
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
    this.fetchSubmissions = this.fetchSubmissions.bind(this)
  }

  componentDidMount(){
    this.fetchSubmissions()
  }

  fetchSubmissions(){
    let submissionList = [];
    const url = "http://localhost:3000/api/submission/getAll";
    const options = {headers: { authorization: 'Bearer ' + sessionStorage.getItem('token') }};
    axios.get(url, options).then((res)=>{
        if(res.status === 200){
            // submissionList = res.data.submissions.map(function(submission){
            //   return {
            //     name: submission.submitter.substring(19),
            //     dateType: submission.type,
            //     status: submission.status,
            //     id: submission._id,
            //   }
            // })
            this.setState({submissions: res.data.submissions});
        }
    }).catch((e)=>{
        console.log(e)
        console.log('Get all submissions failed')
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
                {/* <td className='name'>Name</td>
                <td className='dateType'>Type</td>
                <td className='status'>Status</td> */}
                <td> Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  Type&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Status</td>
              </tr>
            </thead>
            <tbody>
              <ListGroup variant="flush">
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
