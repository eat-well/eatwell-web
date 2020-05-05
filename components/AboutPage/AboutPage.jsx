import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import SectionHeader from '../SectionHeader';
import Link from '@material-ui/core/Link';
import ContentSection from '../ContentSection';
import BackToMainPageLink from '../BackToMainPageLink';
import { PROJECT_NAME } from '../../helpers/constants';

const content = {
  title: `About`,
  subtitle: `About the ${PROJECT_NAME} project`,
};

const AboutPage = ({ classes }) => {
  return (
    <div className={classes.content}>
      <SectionHeader content={content}/>

      <ContentSection>
        <Typography>
          NutrImprove is an initiative that aims to curate the world&apos;s
          largest database of nutritional recommendations.
        </Typography>
        <Typography paragraph={true}>
          The NutrImprove web application will allow nutritionists,
          nutritional therapists and dietitians to recommend healthier
          alternatives to the foods that may not be adequate for optimal
          health.
        </Typography>
        <Typography>
          Recommendations will be stored in a database which will grow as
          more contributors join the project, feeding into a deeper and
          richer source of information for all users.
        </Typography>
        <Typography paragraph={true}>
          In time, the web application will also allow it&apos;s users to
          search for foods and display their nutritional information,
          including vitamins, minerals and their RDI.
        </Typography>
        <Typography paragraph={true}>
          Contributors will have access to this data so they may quickly
          search and recommend healthier alternatives to their clients.
        </Typography>
        <Typography>
          If you are a registered nutritionist, nutritional therapist or
          dietitian and are interested in knowing more about this project
          please contact us via email on:
        </Typography>
        <Link>nutrimprove@gmail.com</Link>
      </ContentSection>
      <BackToMainPageLink/>
    </div>
  );
};

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AboutPage;