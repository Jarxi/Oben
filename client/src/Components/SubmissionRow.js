import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
class SubmissionRow extends React.Component {

  render() {
    const { ticket_number } = this.props;

    return (
        <tr>
          <td>{ticket_number}</td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
          <td>
            <div contentEditable></div>
          </td>
        </tr>
    );
  }
}

SubmissionRow.propTypes = {
  ticket_number: PropTypes.object.isRequired
};

export default SubmissionRow;
