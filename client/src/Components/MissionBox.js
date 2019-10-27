import React from 'react'
import '../CSS/Dashboard.css'

class MissionBox extends React.Component{
    constructor() {
        super()
    }

    render(){
        return(
            <div class = "missionBox">
                <div class = "title">
                    <a link="">{this.props.name}</a>
                </div>
                <div class = "missionIcon">
                    {this.props.icon}
                </div>
            </div>
        );
    }
};

export default MissionBox;