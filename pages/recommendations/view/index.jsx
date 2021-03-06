import SectionHeader from 'components/SectionHeader';
import ViewYourRecommendations from 'components/ViewYourRecommendations';
import React from 'react';

const sectionHeader = {
  title: 'Your Recommendations',
  subtitle: 'Search and view your recommendations',
};

const ViewYourRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <ViewYourRecommendations/>
  </>
);

export default ViewYourRecommendationsPage;