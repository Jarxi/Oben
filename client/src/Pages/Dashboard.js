import React from 'react';
import Sidebar from '../Components/Sidebar';
import MissionBox from '../Components/MissionBox';
import { MdPersonAdd } from 'react-icons/md';
import { TiThumbsUp } from 'react-icons/ti';
import { FaAddressBook, FaChartBar } from 'react-icons/fa';
//import for the TopRow need adjust
import { IconContext } from 'react-icons';
import { TiCog } from 'react-icons/ti';
import { NavLink } from 'react-router-dom';

import '../CSS/Dashboard.css';

class Dashboard extends React.Component {
  render() {
    // const Setup = new MissionBox("Setup");
    return (
      <div class='container'>
        <MissionBox
          name='Submission Override'
          icon={
            <span>
              <FaAddressBook size={60} color='211656' />
            </span>
          }
        />
        <MissionBox
          name='Setup'
          icon={
            <span>
              <MdPersonAdd size={60} color='211656' />
            </span>
          }
        />
        <MissionBox
          name='Approval Requested'
          icon={
            <span>
              <TiThumbsUp size={60} color='211656' />
            </span>
          }
        />
        <MissionBox
          name='Reports'
          icon={
            <span>
              <FaChartBar size={60} color='211656' />
            </span>
          }
        />
      </div>
    );
  }
}

export default Dashboard;
