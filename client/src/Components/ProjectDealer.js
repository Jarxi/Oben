import React from 'react';
import '../CSS/SetUpPage.css';
import AddProject from './AddProject'
import EditProjectInfo from './EditProjectInfo';

class ProjectDealer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedAction: "ADD"
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectedAction: props.selectCallback
        })
    }

    render(){

        return (
            <div className="ExpenseDetail">
                <div>
                    {this.state.selectedAction === "ADD" && <AddProject/>}
                    {this.state.selectedAction === "EDIT" && <EditProjectInfo/>}
                </div>
            </div>
        )
    }
};

export default ProjectDealer;