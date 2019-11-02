import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import SubmissionRow from '../Components/SubmissionRow';
import '../CSS/Home.css'
import '../CSS/SubmissionTable.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import { IoIosAdd } from "react-icons/io";
import Fab from '@material-ui/core/Fab';
import AddCircle from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

class SubmissionTable extends React.Component {
  constructor(){
    super();
    this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.selectCallback(item)
  }


  render(){
    const ticket_numbers = [1];

    return (
        <div class="submissionSection bootstrap-iso">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" />
              <label class="form-check-label">
                Same as last week
              </label>
          </div>

          <Table bordered>
            <thead>
              <tr>
                <td>Ticket ID</td>
                <td>Project Name</td>
                <td class="date">7</td>
                <td class="date">8</td>
                <td class="date">9</td>
                <td class="date">10</td>
                <td class="date">11</td>
                <td class="date">12</td>
                <td class="date">13</td>
              </tr>
            </thead>
            <tbody>
              {ticket_numbers.map(ticket_number => (
                  <SubmissionRow ticket_number={ticket_number} key={ticket_number}/>
              ))}
              <tr>
                <td>
                  <IconButton aria-label="delete" size="small">
                    <AddCircle color='primary' fontSize="inherit" />
                  </IconButton>
                </td>
                <td>Total Hour</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <div class="submit_button">
            <button type="button" class="btn btn-success">Submit</button>
          </div>
          <div class="error_message">
            <p> ❌ Can not exceed 24 hours daily maximum</p>
          </div>
        </div>

    );
  }
};


export default SubmissionTable;
