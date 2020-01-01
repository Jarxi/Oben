import React from 'react';
import moment from 'moment';
import axios from 'axios';
import SubmissionTable from '../Components/SubmissionTable';
import ApprovalLog from '../Components/ApprovalLog';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import ApprovalTable from '../Components/ApprovalTable';

import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/SubmissionPage.css';

const customStyles = {
  content: {
    width: '50%',
    height: '50%',
    margin: '0px 25%',
    top: '16%'
  }
};

class SubmissionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isfetching: true,
      modalShow: false
    };
    this.fetchSubmissions = this.fetchSubmissions.bind(this);
    this.selectCallback = this.selectCallback.bind(this);
  }

  componentDidMount() {
    this.fetchSubmissions();
  }

  fetchSubmissions() {
    const userId = sessionStorage.getItem('user_id');
    let userSubmission;
    const url = 'http://localhost:3000/api/submission/getAll';
    const options = {
      headers: { authorization: 'Bearer ' + sessionStorage.getItem('token') }
    };
    axios
      .get(url, options)
      .then(res => {
        if (res.status === 200) {
          userSubmission = res.data.submissions.filter(
            submission => submission.submitter === userId
          );
          console.log(userSubmission);
          this.setState({
            allSubmissions: userSubmission,
            isfetching: false
          });
        }
      })
      .catch(e => {
        console.log(e);
        console.log('Get all submissions failed');
      });
  }

  selectCallback(submissionData) {
    this.setState({
      selectedSubmission: submissionData,
      modalShow: true
    });
  }

  render() {
    // console.log(sessionStorage);
    return (
      <div class='row'>
        <div className='col left-col'>
          <div class='datePick'>
            <DatePicker
              inline={true}
              selected={this.state.startDate}
              onChange={date => this.setState({ startDate: date })}
            />
          </div>
          {!this.state.isfetching && (
            <ApprovalLog
              page={'submission'}
              allSubmissions={this.state.allSubmissions}
              selectCallback={this.selectCallback}
            />
          )}
        </div>
        <div className='col'>
          <SubmissionTable
            firstDay={moment(this.state.startDate).startOf('week')}
          />
        </div>
        <Modal
          isOpen={this.state.modalShow}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
          onRequestClose={() => {
            this.setState({ modalShow: false });
          }}
          contentLabel='Example Modal'
        >
          <button onClick={() => this.setState({ modalShow: false })}>
            Close
          </button>
          <ApprovalTable
            selectedSubmission={this.state.selectedSubmission}
            page='submission'
          />
        </Modal>
        />
      </div>
    );
  }
}

export default SubmissionPage;
