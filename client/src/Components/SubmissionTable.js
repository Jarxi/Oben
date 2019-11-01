import React from 'react';
import { MdPersonOutline, MdPersonAdd } from "react-icons/md";
import { TiThumbsUp } from "react-icons/ti";
import { FaAddressBook, FaChartBar } from "react-icons/fa";
import '../CSS/Home.css'
import '../CSS/SubmissionTable.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class SubmissionTable extends React.Component {
  constructor(){
    super();
    this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.selectCallback(item)
  }

  render(){

    return (
        <div class="submissionSection bootstrap-iso">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" />
              <label class="form-check-label">
                Same as last week
              </label>
          </div>

          <table>
            <tr>
              <td>Ticket ID</td>
              <td>Input Hours Per Project</td>
              <td class="date">7</td>
              <td class="date">8</td>
              <td class="date">9</td>
              <td class="date">10</td>
              <td class="date">11</td>
              <td class="date">12</td>
              <td class="date">13</td>
            </tr>
            <tr>
              <td>
                <div></div>
              </td>
              <td>
                <div></div>
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
            <tr>
              <td></td>
              <td>Total Hour</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
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
