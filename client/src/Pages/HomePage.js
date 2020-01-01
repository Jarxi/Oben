import React from 'react';
import Sidebar from '../Components/Sidebar';
import MainContent from "../Components/MainContent";

class HomePage extends React.Component {

  render(){

    return (
      <div class="row">
        <Sidebar/>
        <MainContent/>
      </div>
    );
  }
};

export default HomePage;
