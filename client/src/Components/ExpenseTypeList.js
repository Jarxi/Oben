import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class ExpenseTypeList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            expenseType:[]
        };
    }

    componentDidMount(){
        fetch("http://localhost:3000/api/expense/category")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.expenseType
                });
            },
            (error) => {
                this.setState({
                    isLoaded:true,
                    error
                });
                console.log("error occured")
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
                <ul id="EmployeeList" class="list-group bootstrap-iso">
                    {expenseType.map(expense => <li class="list-group-item list-group-item-light"><a href="#" >{expense.name}</a></li>)}
                </ul>
            )}
    }
}

export default ExpenseTypeList;