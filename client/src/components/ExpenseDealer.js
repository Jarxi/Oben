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
    }

    // handleSelect(item) {
    //     this.setState({
    //         selected: item
    //     })
    //     this.props.selectCallback(item)
    // }

    componentWillReceiveProps(props) {
        this.setState({
            selectedAction: props.selectCallback
        })
    }

    render(){

        return (
            <div className="ExpenseDetail">
                <div>
                    {this.state.selectedAction === "ADD" && <AddExpenseType/>}
                    {this.state.selectedAction === "EDIT" && <EditExpenseType/>}
                </div>
            </div>
        )
    }
};

export default ExpenseDealer;