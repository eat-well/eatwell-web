import { Link, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const BackToMainPageLink = ({ classes }) => {
  return (
    <div className={classes.footer}>
      <Typography variant='button' color='inherit'>
        <Link href='/'>Back to main page</Link>
      </Typography>
    </div>
  );
};

BackToMainPageLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default BackToMainPageLink;
