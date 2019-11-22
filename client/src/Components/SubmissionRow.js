import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/SubmissionTable.css';
import axios from 'axios';

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
    const config = {
        headers:{            
            authorization: "Bearer " + sessionStorage.getItem('token')
        }
    };
    axios.get("http://localhost:3000/api/project/projects",config)
    .then(
        (res) => {
            const projectname = [];
            for(var i = 0; i < res.data.projects.length; i++){
                projectname.push(res.data.projects[i].project_name)
            }
            console.log(projectname)
            this.setState({
                projectList: projectname
            });
        },
        (error) => {
            console.log(error)
        }
    )
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
