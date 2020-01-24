import React from 'react';
import axios from 'axios'

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';


class EditExpenseType extends React.Component {
  constructor(props){
    super(props);
    // this.handleSelect = this.handleSelect.bind(this);
    this.state = {
        selectedAction: this.props.selectedCategory,
        expensename: this.props.selectedCategory.category_name,
        newexpensename: this.props.selectedCategory.category_name,
        description: this.props.selectedCategory.description,
        newdescription: this.props.selectedCategory.description

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  
  handleDelete(e){
    e.preventDefault();
    const url = "http://localhost:3000/api/expense/category";
    const config = {
        headers:{            
          authorization: "Bearer " + sessionStorage.getItem('token')
        },
        data:{
          category_name: this.state.expensename, 
        }
    };
    axios.delete(url,config).then((res)=>{
        console.log(res)
        if(res.status === 200){
            this.props.triggerUpdate();
            alert("Succeeded in deleting the expense category!")
        }
        }

    ).catch((e)=>{
        console.log(e)
        console.log("delete category failed")
    })
  }


  handleSubmit(e){
    e.preventDefault();
    const url = "http://localhost:3000/api/expense/category";
    const config = {
        headers:{            
          authorization: "Bearer " + sessionStorage.getItem('token')
        },
        data:{
          category_name: this.state.expensename, 
        }
    };
    axios.delete(url,config).then((res)=>{
        console.log(res)
        // if(res.status === 200){
        //     this.props.triggerUpdate();
        //     alert("Succeeded in add the expense category!")
        // }
        }

    ).catch((e)=>{
        console.log(e)
        console.log("delete category failed")
    })

    const params = {
        category_name: this.state.newexpensename,
        description: this.state.newdescription,
        
    };
    const configpost = {
        headers:{            
            authorization: "Bearer " + sessionStorage.getItem('token')
        }
    };
    axios.post(url,params,configpost).then((res)=>{
        console.log(res)
        if(res.status === 200){
            this.props.triggerUpdate();
            alert("Succeeded in editing the expense category!")
        }
        }

    ).catch((e)=>{
        console.log(e)
        console.log("post category failed")
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
        selectedAction: props.selectedCategory,
        expensename: props.selectedCategory.category_name,
        newexpensename: props.selectedCategory.category_name,
        description: props.selectedCategory.description,
        newdescription: props.selectedCategory.description,
    })
  }
  render(){
    console.log(this.state);
    return (
        <div class = "bootstrap-iso">
            <div className="FormField">
                <label className="FormField__Label">Edit Expense Name</label>
                <input type="text" id="expensename" className="FormField__Input" value={this.state.newexpensename} onChange={this.handleChange}
                        name="newexpensename"/>
            </div>
            <div className="FormField">
                <label className="FormField__Label">Edit Description of this Project</label>
                <input type="text" id="description" className="FormField__Input" value={this.state.newdescription} onChange={this.handleChange}
                        name="newdescription"/>
            </div>

            <div class="informButton">
                <button id="informButtonEdit" type="button" class="btn btn-primary" onClick={this.handleSubmit}>Edit</button>
                <button type="button" class="btn btn-danger" onClick={this.handleDelete}>Delete</button>
            </div>
        </div>
    );
  }
};

export default EditExpenseType;
