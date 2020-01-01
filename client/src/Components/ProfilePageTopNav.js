import React from 'react';
import '../CSS/bootstrap/css/bootstrap-iso.css'

class ProfilePageTopNav extends React.Component {
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
                    <li role="presentation" className={this.state.selected === "ITM" && 'active'}><a>General</a></li>
                </ul>
            </div>
        )
               
    }
}

export default ProfilePageTopNav;
