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
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(){
        console.log("In Handle Update of ProjectDealer")
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
            component = <AddProject triggerUpdate={this.handleUpdate}/>
        } else {
            component = <EditProjectInfo selectedCategory={this.state.selectedAction} triggerUpdate={this.handleUpdate}/>
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

export default ProjectDealer;