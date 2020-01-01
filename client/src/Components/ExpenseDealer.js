import React from 'react';
import '../CSS/SetUpPage.css';
import AddExpenseType from './AddExpenseType'
import EditExpense from './EditExpense';
import EditExpenseType from './EditExpenseType';

class ExpenseDealer extends React.Component {
    constructor(props){
        super(props);
        // this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            selectedAction: "ADD"
        }
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(){
        console.log("In Handle Update of ExpenseDealer")
        this.props.triggerUpdate()
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectedAction: props.selectCallback
        })
    }

    render(){
        let component;
        if(this.state.selectedAction === "ADD"){
            component = <AddExpenseType triggerUpdate={this.handleUpdate}/>
        } else {
            component = <EditExpenseType selectedCategory={this.state.selectedAction} triggerUpdate={this.handleUpdate}/>
        }
        return (
            <div className="ExpenseDetail">
                <div>
                    {/* {this.state.selectedAction === "ADD" && <AddExpenseType triggerUpdate={this.handleUpdate}/>}
                    {this.state.selectedAction === "EDIT" && <EditExpenseType/>} */}
                    {component}
                </div>
            </div>
        )
    }
};

export default ExpenseDealer;