import React from 'react';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';
import axios from 'axios'


class AddExpenseType extends React.Component {
    constructor(){
        super();

        this.state = {
            expensename: '',
            description: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            {
                [name]: value
            }
        )
    }

    handleSubmit(e){
        e.preventDefault();
        const url = "http://localhost:3000/api/expense/category";
        const params = {
            category_name: this.state.expensename,
            description: this.state.description,
            
        };
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.post(url,params,config).then((res)=>{
            console.log(res)
            if(res.status === 200){
                this.props.triggerUpdate();
                alert("Succeeded in add the expense category!")
            }
            }

        ).catch((e)=>{
            console.log(e)
            console.log("post category failed")
        })
    }

    render(){
        return (
            <div class = "bootstrap-iso">
                <form className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label">New Expense Name</label>
                        <input type="text" id="expensename" className="FormField__Input" placeholder="Enter the name of new expense" 
                                name="expensename" value={this.state.expensename} onChange={this.handleChange}/>
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">The Description</label>
                        <input type="text" id="description" className="FormField__Input" placeholder="Enter the Description" 
                                name="description" value={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <div class="informButton">
                        <button type="button" class="btn btn-success" onClick={this.handleSubmit}>Add</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default AddExpenseType;
