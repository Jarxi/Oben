import React from 'react';
import axios from 'axios';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';


class AddProject extends React.Component {
    constructor(){
        super();

        this.state = {
            projectname: '',
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
        const url = process.env.REACT_APP_API_ENDPOINT + "/api/project/create";
        const params = {
            project_name: this.state.projectname,
            project_manager: this.state.description,
            
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
                alert("Succeeded in add the Project!")
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
                        <label className="FormField__Label">Enter Project Name</label>
                        <input type="text" id="projectname" className="FormField__Input" placeholder="Enter the name of new project" 
                                name="projectname" value={this.state.projectname} onChange={this.handleChange}/>
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">The Manager of this project is</label>
                        <input type="text" id="description" className="FormField__Input" placeholder="Enter the manager name" 
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

export default AddProject;
