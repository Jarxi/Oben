import React from 'react';
import ProfilePageTopNav from '../Components/ProfilePageTopNav';
import ProfileInfo from '../Components/ProfileInfo';
import PaymentAddress from '../Components/PaymentAddress';
import ResetPasswordForm from '../Components/ResetPasswordForm';
import ProfileSelfInput from '../Components/ProfileSelfInput';
import InvoiceInput from '../Components/InvoiceInput';

import '../CSS/ProfilePage.css';

class ProfilePage extends React.Component {
  render() {
    return (
      <div className='ProfilePage'>
        <ProfilePageTopNav />
        <div class='LeftCol'>
          <ProfileInfo />
          {sessionStorage.getItem('user_type') === 'contractor' ? (
            <PaymentAddress />
          ) : (
            <ProfileSelfInput />
          )}
        </div>
        <div class='RightCol'>
          <ResetPasswordForm />
          {/* <InvoiceInput /> */}
        </div>
      </div>
    );
  }
}

export default ProfilePage;
