import * as React from 'react';
import * as PropTypes from 'prop-types';
//import { Component } from 'react';
//import './App.css';

import AddPublication from './AddPublication';
import PublicationList from './PublicationList';

const PublicationApp = (
    {publications, labels, handleUpdatePublicationTitle,  handleUpdatePublicationTags,  handleUpdatePublicationNotes, handleUpdatePublication, handleDeletePublication, handleAddPublication}
  ) => <div className="PublicationApp">
  <div className="PublicationApp-header">
    <h2>Publications</h2>
  </div>
  <AddPublication handleAddPublication={handleAddPublication} />
  <PublicationList
    publications={publications}
    labels={labels}
    handleUpdatePublicationTitle={handleUpdatePublicationTitle}
    handleUpdatePublicationTags={handleUpdatePublicationTags}
    handleUpdatePublicationNotes={handleUpdatePublicationNotes}
    handleTogglePublication={handleUpdatePublication}
    handleDeletePublication={handleDeletePublication}
  />
</div>;

PublicationApp.propTypes = {
  publications: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.array,
    done: PropTypes.bool,
  })),
  labels: PropTypes.array,
  handleUpdatePublicationTitle: PropTypes.func.isRequired,
  handleUpdatePublicationTags: PropTypes.func.isRequired,
  handleUpdatePublicationNotes: PropTypes.func.isRequired,
  handleUpdatePublication: PropTypes.func.isRequired,
  handleDeletePublication: PropTypes.func.isRequired,
  handleAddPublication: PropTypes.func.isRequired,
};

export default PublicationApp;
