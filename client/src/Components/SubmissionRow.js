import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import Axios from 'axios';

class SubmissionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [ 'Select', 'Project1', 'Project2', 'Project3']
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(col, event){
      this.props.onCellChange(col, event.target.value);
  }

  componentDidMount(){
    // load projectList
  }

  render() {
    const { ticket_number } = this.props;

    return (
        <tr>
          <td>{ticket_number}</td>
          <td>
            <select class="select" onChange={this.handleChange.bind(this, 'project')}>
              {
                this.state.projectList.map(project => <option value={project}>{project}</option>)
              }
            </select>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 0)} contentEditable></input>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 1)} contentEditable></input>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 2)} contentEditable></input>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 3)} contentEditable></input>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 4)} contentEditable></input>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 5)} contentEditable></input>
          </td>
          <td>
            <input onBlur={this.handleChange.bind(this, 6)} contentEditable></input>
          </td>
        </tr>
    );
  }
}

SubmissionRow.propTypes = {
  ticket_number: PropTypes.number.isRequired,
};

export default SubmissionRow;
