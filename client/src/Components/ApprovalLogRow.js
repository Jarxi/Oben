import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import Axios from 'axios';

class ApprovalLogRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, dateType, status } = this.props;

    return (
        <tr>
          <td>{name}</td>
          <td>{dateType}</td>
          <td>{status}</td>
        </tr>
    );
  }
}

ApprovalLogRow.propTypes = {
  name: PropTypes.string.isRequired,
  dateType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default ApprovalLogRow;
