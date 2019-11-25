import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import axios from 'axios';

class SubmissionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: []
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(col, event) {
    this.props.onCellChange(col, event.target.value);
    const newAmount = this.state.initialDateAmount;
    newAmount[col] = event.target.value;
    this.setState({
      initialDateAmount: newAmount
    })
  }

  static getDerivedStateFromProps(props, state){
    return { 
      initialDateAmount: props.weeklyDateAmount || ['','','','','','',''],
      projectSubmittedByUser: props.projectName,
      viewOnly: props.viewOnly,
    }
  }

  componentDidMount() {
    const config = {
      headers: {
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    axios.get('http://localhost:3000/api/project/projects', config).then(
      res => {
        const projectname = [''];
        for (var i = 0; i < res.data.projects.length; i++) {
          projectname.push(res.data.projects[i].project_name);
        }
        // console.log(projectname);
        this.setState({
          projectList: projectname
        });
      },
      error => {
        console.log(error);
      }
    );
    
  }

  render() {
    const { ticket_number,  } = this.props;
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
            onBlur={this.handleChange.bind(this, i)}
            onChange={this.handleChange.bind(this,i)}
            disabled={this.state.viewOnly}
            value={(this.state.viewOnly || this.props.displayInitialVal) && this.state.initialDateAmount[i]}
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

SubmissionRow.propTypes = {
  ticket_number: PropTypes.number.isRequired
};

export default SubmissionRow;
