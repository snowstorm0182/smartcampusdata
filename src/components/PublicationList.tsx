import * as React from 'react';
import Select from 'react-select';

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
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  state = {
    filter:  [],
  }
  handleMultiChange(option) {
    this.setState(state => {
      return {
        filter: option
      };
    });
  }
  statefiltered = () => {
    // At the moment we are only looking at match to labels in attached quotes
    function common(a, b) {
      return b.filter(Set.prototype.has.bind(new Set(a)));
    }
    let matchingLabels = this.props.labels.filter((l)=>{
      let isSelected = this.state.filter.map((f)=>Number(f['value'])).includes(Number(l.id));
      let childFilters = this.state.filter.filter((f)=>(String(l.title).toLowerCase().indexOf(String(f['label']).toLowerCase())>-1));
      return (isSelected || childFilters.length > 0);
    });
    let matchingLabelTexts = matchingLabels.map((ml)=>ml.title);
    let matchingQuotes = this.props.quotes.filter((q)=>{
      return [q.labels, matchingLabelTexts].reduce(common).length > 0;
    })

    return this.props.publications.filter((p)=>{
      if(this.state.filter.length === 0) {return true};
      if(matchingQuotes.filter((q)=>q.publicationId === p.id).length > 0) {return true};
      if( p.tags && [p.tags.map((t)=>parseInt(t)),
        matchingLabels.map((ml)=>ml.id)
        ].reduce(common).length > 0) {return true};
      return false;
    });
  }

  render = () => { return (
    <div>
    <Select
        value={this.state.filter}
        onChange={this.handleMultiChange}
        isMulti
        getOptionValue ={(option)=>option.id}
        options={this.props.labels.map((l)=>{return {id:l.id,value:'f'+l.id,label:l.title}})}
      />
    <ul style={{paddingLeft : '0'}}>
      {this.statefiltered()
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
    </ul></div>
  )}
}

export default PublicationList;
