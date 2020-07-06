import { AppBar } from '@material-ui/core';
import MenuButton from 'components/Header/MainNav/MenuButton';
import RightNavText from 'components/Header/MainNav/RightNavText';
import { emailVerified, isAdmin, isApproved } from 'helpers/userUtils';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useSelector } from 'react-redux';

const menus = [
  {
    name: 'Search Food',
    options: [
      { label: 'By Food Name', link: '/search/food' },
      { label: 'By Nutrient', link: '/search/nutrient' },
    ],
  },
  {
    name: 'Recommendations',
    options: [
      { label: 'View Yours', link: '/recommendations/view' },
      { label: 'View All', link: '/recommendations/view-all' },
      { divider: true },
      { label: 'Add', link: '/recommendations/add' },
      { label: 'Bulk Add', link: '/recommendations/bulk-add' },
      { divider: true },
      { label: 'Review', link: '/recommendations/review' },
    ],
  },
];

const adminOption = {
  name: 'Admin Panel',
  link: '/admin-panel',
};

const MainNav = ({ classes }) => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const [disabled, setDisabled] = useState(true);
  const { promiseInProgress: loadingUser } = usePromiseTracker({ area: 'getUser' });

  useEffect(() => {
    setDisabled(!userDetails || !userDetails.email || !emailVerified() || !isApproved());
  }, [userDetails]);

  const RightNavContent = () => {
    if (userDetails && userDetails.email && emailVerified()) {
      return isApproved()
        ? <RightNavText>{userDetails.email}</RightNavText>
        : <RightNavText important={true}>Waiting for an Admin Approval</RightNavText>;
    } else if (disabled && loadingUser) {
      return (
        <RightNavText>Loading user data . . .</RightNavText>
      );
    }
    return null;
  };

  return (
    <AppBar position='static' classes={{ root: classes.menuBar }}>
      <div className={classes.container}>
        {menus.map(menu => (
          <MenuButton key={menu.name} menu={menu} disabled={disabled}/>
        ))}
        {isAdmin(userDetails) && (
          <MenuButton menu={adminOption}/>
        )}
        <RightNavContent/>
      </div>
    </AppBar>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainNav;
