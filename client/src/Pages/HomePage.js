import React from 'react';
import Sidebar from '../Components/Sidebar';
import MainContent from "../Components/MainContent";

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: "overview"
    }
    this.handleItemSelect = this.handleItemSelect.bind(this)
  }

  handleItemSelect(item) {
    this.setState({
      selected: item
    })
  }
  render(){

    return (
      <div class="row">
        <Sidebar selectCallback={this.handleItemSelect}/>
        <MainContent window={this.state.selected}/>
      </div>
    );
  }
};

export default HomePage;
