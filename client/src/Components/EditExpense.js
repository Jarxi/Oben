import React from 'react';

import '../CSS/EditTeamMember.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import ExpenseTypeList from './ExpenseTypeList';
import ExpenseDealer from './ExpenseDealer';

class EditExpense extends React.Component {
  constructor() {
    super();
    this.hanldleSelect = this.hanldleSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      selected: 'ADD'
    };
  }

  hanldleSelect(item) {
    this.setState({
      selected: item
    });
  }

  handleUpdate() {
    console.log('handleupdate In EditExpense');
    this.refs.child.fetchExpenseType();
  }

  render() {
    return (
      <div class='canvas'>
        <div class='title'>Expense Category</div>
        <div class='employeeList'>
          <div class='ListWrapper'>
            <ExpenseTypeList ref='child' selectCallback={this.hanldleSelect} />
          </div>
        </div>
        <div class='ButtonWrapper bootstrap-iso'>
          <button
            type='button'
            className='btn btn-success inlineButton'
            onClick={() => this.hanldleSelect('ADD')}
          >
            Add
          </button>
          <button
            type='button'
            className='btn btn-primary inlineButton'
            onClick={() => this.hanldleSelect('EDIT')}
          >
            Edit
          </button>
          <button
            type='button'
            className='btn btn-danger inlineButton'
            onClick={() => this.hanldleSelect('DELETE')}
          >
            Delete
          </button>
        </div>
        <div class='ExpenseInfo'>
          <ExpenseDealer
            selectCallback={this.state.selected}
            triggerUpdate={this.handleUpdate}
          />
        </div>
      </div>
    );
  }
}

export default EditExpense;
