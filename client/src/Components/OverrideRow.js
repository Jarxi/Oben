import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import axios from 'axios';

class OverrideRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDateAmount: props.weeklyDateAmount,
      projectSubmittedByUser: props.projectName,

    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleBlur(col, event) {
    this.props.onCellChange(col, event.target.value);
  }

  handleChange(col, event){
    const newAmount = this.state.initialDateAmount;
    newAmount[col] = event.target.value;
    this.setState({
      initialDateAmount: newAmount
    })
  }


  render() {
    const { ticket_number } = this.props;
    const projectSelect = this.state.projectSubmittedByUser ?
          (<td>{this.state.projectSubmittedByUser}</td>) :
          (<td>
            <select
              class='select'
              onChange={this.handleChange.bind(this, 'project')}
            >
              {this.state.projectList.map(project => (
                <option value={project}>{project}</option>
              ))}
            </select>
          </td>)

    const dateAmountCols = [];
    for(let i = 0; i < 7; ++i){
      dateAmountCols.push(
        <td>
          <input
            onBlur={this.handleBlur.bind(this, i)}
            onChange={this.handleChange.bind(this,i)}
            value={this.state.initialDateAmount[i]}
          ></input>
        </td>
      )
    }

    return (
      <tr>
        <td>{ticket_number}</td>
        {projectSelect}
        {dateAmountCols}
      </tr>
    );
  }
}

OverrideRow.propTypes = {
  ticket_number: PropTypes.number.isRequired
};

export default OverrideRow;