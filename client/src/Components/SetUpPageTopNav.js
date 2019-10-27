import React from 'react';
import '../CSS/bootstrap/css/bootstrap-iso.css'

class SetUpPageTopNav extends React.Component {
    constructor(){
        super();
        this.hanldleSelect = this.hanldleSelect.bind(this);
        this.state = {
            selected: "ITM"
        }
    }

    hanldleSelect(item) {
        this.setState({
            selected: item
        })
        this.props.selectCallback(item)
    }
    render() {
        return (
            <div class="bootstrap-iso">
                <ul class="nav nav-tabs nav-justified">
                    <li role="presentation" className={this.state.selected === "ITM" && 'active'} onClick={() => this.hanldleSelect("ITM")}><a>Invite Team Member</a></li>
                    <li role="presentation" className={this.state.selected === "ETM" && 'active'} onClick={() => this.hanldleSelect("ETM")}><a>Edit Team Member</a></li>
                    <li role="presentation" className={this.state.selected === "EP" && 'active'} onClick={() => this.hanldleSelect("EP")}><a>Edit Project</a></li>
                    <li role="presentation" className={this.state.selected === "EE" && 'active'} onClick={() => this.hanldleSelect("EE")}><a>Edit Expense</a></li>
                </ul>
            </div>
        )
               
    }
}

export default SetUpPageTopNav;
