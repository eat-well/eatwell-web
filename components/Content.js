import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import SearchFoodPage from './SearchFoodPage';
import ViewRecommendationsPage from './ViewRecommendationsPage';
import AddRecommendationsPage from './AddRecommendationsPage';
import AdminPanel from './AdminPanel';
import { connect } from 'react-redux';
import { isAdmin } from '../helpers/userUtils';
import Paper from '@material-ui/core/Paper';
import { MIN_WIDTH } from '../helpers/constants';

function TabContainer(props) {
  return <Paper style={{ padding: 8 * 3 }}>{props.children}</Paper>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Content = ({ classes, userDetails }) => {
  const [tab, setTab] = useState(0);

  const tabChange = (event, tab) => {
    setTab(tab);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.tabs}>
        <Tabs value={tab} onChange={tabChange}>
          <Tab label='Search Food' />
          <Tab label='View Recommendations' />
          <Tab label='Add Recommendations' />
          {userDetails.approved && isAdmin(userDetails) && (
            <Tab label='Admin Panel' />
          )}
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer id='foodByName'>
          <SearchFoodPage />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer id='recommendations'>
          <ViewRecommendationsPage />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer id='addRecommendations'>
          <AddRecommendationsPage />
        </TabContainer>
      )}
      {tab === 3 && (
        <TabContainer id='adminPanel'>
          <AdminPanel />
        </TabContainer>
      )}
    </div>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: MIN_WIDTH,
  },
  tabs: {
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '9px 9px 0 0',
  },
});

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Content));
