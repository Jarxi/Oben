import React from 'react';
import axios from 'axios';


import '../CSS/EditTeamMember.css'
import '../CSS/bootstrap/css/bootstrap-iso.css';

class ProjectList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            projects:[],
            selectedProject: null
        };
        this.handleProjectSelect = this.handleProjectSelect.bind(this);
    }

    componentDidMount(){
        this.fetchProject();
    }

    handleProjectSelect(project){
        this.setState({selectedProject:project})
        this.props.selectCallback(project)
    }

    fetchProject(){
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        axios.get("http://localhost:3000/api/project/projects",config)
        .then(
            (res) => {
                console.log(res)
                this.setState({
                    isLoaded: true,
                    projects: res.data.projects
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
        // const Projectlist = [
        //     {name: 'Text To Speech', email: 'qqwwerr@gmail.com'},
        //     {name: 'Speech to Sing', email: '3432f@gmail.com'},
        // ];

        // return(
        //     <ul id="EmployeeList" class="list-group bootstrap-iso">
        //         {Projectlist.map(project => <li class="list-group-item list-group-item-light"><a href="#" >{project.name}</a></li>)}
        //     </ul>
        // )
        const {error, isLoaded, projects} = this.state;
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
                    {projects.map(project => <button type="button" class="list-group-item list-group-item-action" onClick={() => this.handleProjectSelect(project)}>{project.project_name}</button>)}
                </div>

                // <div id="EmployeeList" class="list-group bootstrap-iso">
                //     {expenseType.map(expense => <button type="button" className={this.state.active === expense.category_name ? 'active' : ''} class="list-group-item list-group-item-action" onClick={() => this.handleSelect(expense.category_name)}>{expense.category_name}</button>)}
                // </div>


            )
        }
    }
}

export default ProjectList;