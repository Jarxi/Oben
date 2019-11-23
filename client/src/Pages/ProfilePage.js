import React from 'react';
import ProfilePageTopNav from '../Components/ProfilePageTopNav';
import ProfileInfo from '../Components/ProfileInfo';
import PaymentAddress from '../Components/PaymentAddress';
import ResetPasswordForm from '../Components/ResetPasswordForm';

import '../CSS/ProfilePage.css';


class ProfilePage extends React.Component {


    render(){
        return (
            <div className = "ProfilePage">
                <ProfilePageTopNav/>
                <div class="LeftCol">
                    <ProfileInfo/>
                    <PaymentAddress/>
                </div>
                <div class="RightCol">
                    <ResetPasswordForm/>
                </div>
            </div>
            
        );
    }
}

export default ProfilePage;