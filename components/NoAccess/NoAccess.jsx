import { PROJECT_NAME } from 'helpers/constants';
import PropTypes from 'prop-types';
import React from 'react';
import SectionHeader from '../SectionHeader';

const content = {
  title: PROJECT_NAME,
  subtitle: 'Please login to be able to use the website!',
  message: '',
};

const NoAccess = ({ userDetails }) => {
  if (userDetails.email) {
    if (!userDetails.email_verified) {
      content.subtitle = 'Please verify your email account';
      content.messages = [
        'Thank you for registering.',
        'Please follow the link provided in the verification email we sent you to verify your email address.',
      ];
    } else if (!userDetails.approved) {
      content.subtitle = 'Waiting for an Admin Approval';
      content.messages = [
        'An admin will need to verify your account so that you can access the functionality of the site.',
        'Please try again later!',
      ];
    }
  }

  return (
    <>
      {userDetails && <SectionHeader content={content}/>}
    </>
  );
};

NoAccess.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

export default NoAccess;
