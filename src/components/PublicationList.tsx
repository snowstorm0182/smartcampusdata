import * as React from 'react';

import Publication from './Publication';

class PublicationList extends React.Component
  <any, any> {
  public static defaultProps = {
    filters: [],
    publications: [],
    labels: [],
    quotes: [],
    forums: [],
  };

  constructor(props) {
    super(props);
  }

  state = {
    filter:  [],
  }

  render = () => { return (
    <ul style={{paddingLeft : '0'}}>
      {this.props.publications
        .filter((i) => (!this.props.filters.includes(i.state)))
        .filter((i)=>(
          (!this.props.filters.includes('forums') && i.forum) || this.props.filters.includes('forums')
        ))
        .map((publication) => <Publication
        filters={this.props.filters}
        key={publication.id}
        {...publication}
        labels={this.props.labels}
        quotes={this.props.quotes}
        forums={this.props.forums}
        handleUpdatePublicationField={this.props.handleUpdatePublicationField}
        handleUpdatePublicationTitle={this.props.handleUpdatePublicationTitle}
        handleUpdatePublicationEdit={this.props.handleUpdatePublicationEdit}
        handleTogglePublication={this.props.handleTogglePublication}
        handleUpdatePublicationTags={this.props.handleUpdatePublicationTags}
        handleUpdatePublicationNotes={this.props.handleUpdatePublicationNotes}
        handleDeletePublication={this.props.handleDeletePublication}
      />)}
    </ul>
  )}
}

export default PublicationList;
