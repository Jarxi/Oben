import React from 'react';
import axios from 'axios'

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class ExpenseTypeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            expenseType:[],
            selectedExpense: null
        };
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
    }

    componentDidMount(){
        this.fetchExpenseType();
    }

    handleCategorySelect(expense){
        this.setState({selectedExpense:expense})
        this.props.selectCallback(expense)
        console.log(this.state.selectedExpense)
    }

    fetchExpenseType(){
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.get("http://localhost:3000/api/expense/category",config)
        .then(
            (res) => {
                this.setState({
                    isLoaded: true,
                    expenseType: res.data.categories
                });
            },
            (error) => {
                this.setState({
                    isLoaded:true,
                    error
                });
            }
        )
    }
    render(){
        // Hardcoded users info format!
        // TODO: Backend API return registered User Info
        // const ExpenseType = [
        //     {name: 'Travel', email: 'qqwwerr@gmail.com'},
        //     {name: 'Breakfast', email: '3432f@gmail.com'},
        // ];
        const {error, isLoaded, expenseType} = this.state;
        if(error){
            return <div>Error: {error.message}</div>;
        }else if (!isLoaded){
            return <div>Loading...</div>
        }else{
            return(
                // <ul id="EmployeeList" class="list-group bootstrap-iso">
                //     {expenseType.map(expense => <li class="list-group-item list-group-item-light">{expense.category_name}</li>)}
                // </ul>
                <div id="EmployeeList" class="list-group bootstrap-iso">
                    {expenseType.map(expense => <button type="button" class="list-group-item list-group-item-action" onClick={() => this.handleCategorySelect(expense)}>{expense.category_name}</button>)}
                </div>

                // <div id="EmployeeList" class="list-group bootstrap-iso">
                //     {expenseType.map(expense => <button type="button" className={this.state.active === expense.category_name ? 'active' : ''} class="list-group-item list-group-item-action" onClick={() => this.handleSelect(expense.category_name)}>{expense.category_name}</button>)}
                // </div>


            )
        }
    }
}

export default ExpenseTypeList;