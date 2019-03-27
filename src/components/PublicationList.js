import * as React from 'react';
import * as PropTypes from 'prop-types';

import Publication from './Publication';

const PublicationList = ({publications, labels, quotes, handleUpdatePublicationTitle, handleUpdatePublicationEdit,  handleUpdatePublicationTags,  handleUpdatePublicationNotes, handleTogglePublication, handleDeletePublication}) => <ul>
  {publications.map((publication) => <Publication
    key={publication.id}
    {...publication}
    labels={labels}
    quotes={quotes}
    handleUpdatePublicationTitle={handleUpdatePublicationTitle}
    handleUpdatePublicationEdit={handleUpdatePublicationEdit}
    handleTogglePublication={handleTogglePublication}
    handleUpdatePublicationTags={handleUpdatePublicationTags}
    handleUpdatePublicationNotes={handleUpdatePublicationNotes}
    handleDeletePublication={handleDeletePublication}
  />)}
</ul>;

PublicationList.propTypes = {
  publications: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    crossref: PropTypes.object,
    tags: PropTypes.array,
    done: PropTypes.bool,
    edit: PropTypes.bool,
  })),
  labels: PropTypes.array.isRequired,
  quotes: PropTypes.array.isRequired,
  handleUpdatePublicationTitle: PropTypes.func.isRequired,
  handleUpdatePublicationEdit: PropTypes.func.isRequired,
  handleUpdatePublicationTags: PropTypes.func.isRequired,
  handleUpdatePublicationNotes: PropTypes.func.isRequired,
  handleTogglePublication: PropTypes.func.isRequired,
  handleDeletePublication: PropTypes.func.isRequired
};

export default PublicationList;
