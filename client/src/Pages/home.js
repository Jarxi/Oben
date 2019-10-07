import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import MainContent from "../Components/MainContent";

class Home extends React.Component {
  render(){

    return (
      <div class="row">
        <Sidebar/>
        <MainContent/>
      </div>
    );
  }
};

export default Home;
