import React from 'react';
import ProfilePageTopNav from '../Components/ProfilePageTopNav';

import '../CSS/ProfilePage.css';

class ProfilePage extends React.Component {


    render(){
        return (
            <div className = "ProfilePage">
                <ProfilePageTopNav/>
                <div class="LeftCol">
                    
                </div>
                <div class="RightCol">

                </div>
            </div>
            
        );
    }
}

export default ProfilePage;