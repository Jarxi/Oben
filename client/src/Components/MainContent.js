import React from 'react';
import '../CSS/Home.css';
import { IconContext } from "react-icons";
import { TiCog } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import SetUpPage from '../Pages/SetUpPage'
import Dashboard from '../Pages/Dashboard';

class MainContent extends React.Component {

  render(){
    const window = this.props.window
    return (
        <div class="mainContent">

          <div class="TopRow">
            <IconContext.Provider value={{ color: "black", size:"4em" }}>
              <div className="Setting_Icon"><NavLink to="/resetPassword"><TiCog /></NavLink></div>
            </IconContext.Provider>            
          </div>

          {window === "overview" && <Dashboard/>}
          {window === "setUp" && <SetUpPage/>}

        </div>
    );
  }
};

export default MainContent;
