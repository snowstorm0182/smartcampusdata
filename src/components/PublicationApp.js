import * as React from 'react';
import * as PropTypes from 'prop-types';
//import { Component } from 'react';
//import './App.css';

import AddPublication from './AddPublication';
import PublicationList from './PublicationList';
import PublicationExport from './PublicationExport';

const PublicationApp = (
    {filters, publications, labels, quotes, visibility, handleVisibilityUpdatePublicationAdd, handleUpdatePublicationTitle, handleUpdatePublicationField, handleUpdatePublicationEdit, handleUpdatePublicationTags,  handleUpdatePublicationNotes, handleUpdatePublication, handleDeletePublication, handleAddPublication}
  ) => <div className="PublicationApp">
  <div className="PublicationApp-header">
    <h2>Publications <button onClick={(e) => handleVisibilityUpdatePublicationAdd({addPublication:!visibility.addPublication})}>Add form</button></h2>
  </div>
  {visibility.addPublication ? (
    <AddPublication
    publications={publications}
    handleAddPublication={handleAddPublication} />
  ):null}
  <PublicationList
    filters={filters}
    publications={publications}
    labels={labels}
    quotes={quotes}
    handleUpdatePublicationTitle={handleUpdatePublicationTitle}
    handleUpdatePublicationField={handleUpdatePublicationField}
    handleUpdatePublicationEdit={handleUpdatePublicationEdit}
    handleUpdatePublicationTags={handleUpdatePublicationTags}
    handleUpdatePublicationNotes={handleUpdatePublicationNotes}
    handleTogglePublication={handleUpdatePublication}
    handleDeletePublication={handleDeletePublication}
  />
  <PublicationExport
    filters={filters}
    publications={publications}
    labels={labels}
    quotes={quotes}
    handleUpdatePublicationTitle={handleUpdatePublicationTitle}
    handleUpdatePublicationField={handleUpdatePublicationField}
    handleUpdatePublicationEdit={handleUpdatePublicationEdit}
    handleUpdatePublicationTags={handleUpdatePublicationTags}
    handleUpdatePublicationNotes={handleUpdatePublicationNotes}
    handleTogglePublication={handleUpdatePublication}
    handleDeletePublication={handleDeletePublication}
  />
</div>;

PublicationApp.propTypes = {
  filters: PropTypes.array.isRequired,
  publications: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string,
    id: PropTypes.number.isRequired,
    tags: PropTypes.array,
    done: PropTypes.bool,
    toggleEdit: PropTypes.bool,
  })),
  labels: PropTypes.array,
  quotes: PropTypes.array,
  visibility: PropTypes.object,
  handleVisibilityUpdatePublicationAdd: PropTypes.func.isRequired,
  handleUpdatePublicationTitle: PropTypes.func.isRequired,
  handleUpdatePublicationField: PropTypes.func.isRequired,
  handleUpdatePublicationEdit: PropTypes.func.isRequired,
  handleUpdatePublicationTags: PropTypes.func.isRequired,
  handleUpdatePublicationNotes: PropTypes.func.isRequired,
  handleUpdatePublication: PropTypes.func.isRequired,
  handleDeletePublication: PropTypes.func.isRequired,
  handleAddPublication: PropTypes.func.isRequired,
};

export default PublicationApp;
