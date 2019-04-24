import * as React from 'react';
import * as PropTypes from 'prop-types';

import Publication from './Publication';

const PublicationList = ({filters, publications, labels, quotes, handleUpdatePublicationTitle, handleUpdatePublicationField, handleUpdatePublicationEdit,  handleUpdatePublicationTags,  handleUpdatePublicationNotes, handleTogglePublication, handleDeletePublication}) =>
<ul style={{paddingLeft : '0'}}>
  {publications
    .filter((i) => (!filters.includes(i.state)))
    .map((publication) => <Publication
    filters={filters}
    key={publication.id}
    {...publication}
    labels={labels}
    quotes={quotes}
    handleUpdatePublicationField={handleUpdatePublicationField}
    handleUpdatePublicationTitle={handleUpdatePublicationTitle}
    handleUpdatePublicationEdit={handleUpdatePublicationEdit}
    handleTogglePublication={handleTogglePublication}
    handleUpdatePublicationTags={handleUpdatePublicationTags}
    handleUpdatePublicationNotes={handleUpdatePublicationNotes}
    handleDeletePublication={handleDeletePublication}
  />)}
</ul>;

PublicationList.propTypes = {
  filters: PropTypes.array,
  publications: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string,
    id: PropTypes.number.isRequired,
    crossref: PropTypes.object,
    tags: PropTypes.array,
    done: PropTypes.bool,
    edit: PropTypes.bool,
  })),
  labels: PropTypes.array.isRequired,
  quotes: PropTypes.array.isRequired,
  handleUpdatePublicationField: PropTypes.func.isRequired,
  handleUpdatePublicationTitle: PropTypes.func.isRequired,
  handleUpdatePublicationEdit: PropTypes.func.isRequired,
  handleUpdatePublicationTags: PropTypes.func.isRequired,
  handleUpdatePublicationNotes: PropTypes.func.isRequired,
  handleTogglePublication: PropTypes.func.isRequired,
  handleDeletePublication: PropTypes.func.isRequired
};

export default PublicationList;
