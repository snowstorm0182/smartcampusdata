import * as React from 'react';
import * as PropTypes from 'prop-types';

import Publication from './Publication';

const PublicationList = ({publications, labels, handleUpdatePublicationTitle,  handleUpdatePublicationTags,  handleUpdatePublicationNotes, handleTogglePublication, handleDeletePublication}) => <ul>
  {publications.map((publication) => <Publication
    key={publication.id}
    {...publication}
    labels={labels}
    handleUpdatePublicationTitle={handleUpdatePublicationTitle}
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
    tags: PropTypes.array,
    done: PropTypes.bool,
  })),
  labels: PropTypes.array.isRequired,
  handleUpdatePublicationTitle: PropTypes.func.isRequired,
  handleUpdatePublicationTags: PropTypes.func.isRequired,
  handleUpdatePublicationNotes: PropTypes.func.isRequired,
  handleTogglePublication: PropTypes.func.isRequired,
  handleDeletePublication: PropTypes.func.isRequired
};

export default PublicationList;
