import React from 'react';
import axios from 'axios';

import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';


class EditProjectInfo extends React.Component {
    constructor(props){
        super(props);
        // this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            selectedAction: this.props.selectedCategory,
            projectname: this.props.selectedCategory.project_name,
            newprojectname: this.props.selectedCategory.project_name,
            manager: this.props.selectedCategory.project_manager,
            newmanager: this.props.selectedCategory.project_manager
    
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
        const url = process.env.REACT_APP_API_ENDPOINT + "/api/project";
        const config = {
            headers:{            
              authorization: "Bearer " + sessionStorage.getItem('token')
            },
            data:{
              project_name: this.state.projectname, 
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
        const url = process.env.REACT_APP_API_ENDPOINT + "/api/project";
        const config = {
            headers:{            
              authorization: "Bearer " + sessionStorage.getItem('token')
            },
            data:{
              project_name: this.state.projectname, 
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
            console.log("delete project failed")
        })
        
        const url2 = process.env.REACT_APP_API_ENDPOINT + "/api/project/create";
        const params = {
            project_name: this.state.newprojectname,
            project_manager: this.state.newmanager,
            
        };
        const configpost = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.post(url2,params,configpost).then((res)=>{
            console.log(res)
            if(res.status === 200){
                this.props.triggerUpdate();
                alert("Succeeded in editing the Porject!")
            }
            }
    
        ).catch((e)=>{
            console.log(e)
            console.log("post project failed")
        })
      }
    
      componentWillReceiveProps(props) {
        this.setState({
            selectedAction: props.selectedCategory,
            projectname: props.selectedCategory.project_name,
            newprojectname: props.selectedCategory.project_name,
            manager: props.selectedCategory.project_manager,
            newmanager: props.selectedCategory.project_manager,
        })
      }
      render(){
        console.log(this.state);
        return (
            <div class = "bootstrap-iso">
                <div className="FormField">
                    <label className="FormField__Label">Edit Project Name</label>
                    <input type="text" id="projectname" className="FormField__Input" value={this.state.newprojectname} onChange={this.handleChange}
                            name="newprojectname"/>
                </div>
                <div className="FormField">
                    <label className="FormField__Label">Edit Manager</label>
                    <input type="text" id="manager" className="FormField__Input" value={this.state.newmanager} onChange={this.handleChange}
                            name="newmanager"/>
                </div>
    
                <div class="informButton">
                    <button id="informButtonEdit" type="button" class="btn btn-primary" onClick={this.handleSubmit}>Edit</button>
                    <button type="button" class="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </div>
            </div>
        );
      }
};

export default EditProjectInfo;
