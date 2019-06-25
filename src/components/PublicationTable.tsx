import * as React from 'react';
import Select from 'react-select';

//import Publication from './Publication';
import PublicationObject from '../helpers/PublicationObject';

class PublicationTable extends React.Component
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
    this.handleMultiExcludeChange = this.handleMultiExcludeChange.bind(this);
  }

  state = {
    filter:  [],
    exclude:  [],
  }

  handleMultiChange(option) {
    this.setState(state => {
      return {
        filter: option
      };
    });
  }

  handleMultiExcludeChange(option) {
    this.setState(state => {
      return {
        exclude: option
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
    let excludedLabels = this.props.labels.filter((l)=>{
      let isExSelected = this.state.exclude.map((f)=>Number(f['id'])).includes(Number(l.id));
      return (isExSelected);
    });

    return this.props.publications.filter((p)=>{
      if(this.state.exclude.length !== 0) {
        if( p.tags && [p.tags.map((t)=>parseInt(t)),
          excludedLabels.map((ml)=>ml.id)
        ].reduce(common).length > 0) {return false};
      };
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
    <Select
        value={this.state.exclude}
        onChange={this.handleMultiExcludeChange}
        isMulti
        getOptionValue ={(option)=>option.id}
        options={this.props.labels.map((l)=>{return {id:l.id,value:'f'+l.id,label:l.title}})}
      />
    <table>
      <thead><tr>
        <th>i</th>
        <th>Title</th>
        <th>Forum</th>
        <th>Published</th>
        <th>Link</th>
        <th>Abstract</th>
        <th>Labels</th>
        <th>Notes</th>
        <th>Highlights</th>
      </tr></thead>
      <tbody>
      {this.statefiltered()
        .filter((i) => (!this.props.filters.includes(i.state)))
        .filter((i)=>(
          (!this.props.filters.includes('forums') && i.forum) || this.props.filters.includes('forums')
        ))
        .map((publication)=>new PublicationObject(publication))
        .map((publication) =>
        <tr key={'publicationtableitem-'+publication.id}>
          <td>{publication.id}</td>
          <td>{publication.title}</td>
          <td>{publication.forum ?
            this.props.forums.filter((i) => (publication.forum == i.id))[0].text:
            ''}</td>
          <td>{publication.getPublishedAt().trim()}</td>
          <td><a target='_blank' href={'https://dx.doi.org/'+publication.doi.trim()}>{publication.doi.trim()}</a></td>
          <td style={{    whiteSpace: 'nowrap',
    maxWidth: '10em',
    overflow: 'hidden',
    textOverflow: 'ellipsis'}} title={publication.abstract}>{publication.abstract}</td>
          <td>{
            publication.tags ? this.props.labels.filter(
              (i) => (
                publication.tags.map((t)=>parseInt(t)).includes(i.id)
              )
            ).map(
              (i, idx) => (<div key={'publicationtableitemtag-'+publication.id+'-'+i.id}>{ `[${idx+1}]` + ' ' + i.title }</div>)
            ) : null
          }
          </td>
          <td>{publication.notes ? publication.notes.map((i, idx) => (
              <div  key={'publicationtableitemnote-'+publication.id+'-'+idx}>{ `[${idx+1}]` + ' ' + i }</div>
            )): ""}
          </td>
          <td>{(
            /*this.props.quotes.filter((i) => (publication.publicationId == this.props.id)).map((i) => (
              <span>.</span>
            )*/
            this.props.quotes.filter((i) => (i.publicationId == publication.id)).length > 0 ? "exist": null
          )}
          </td>
        </tr>
      )}
      </tbody>
    </table></div>
  )}
}

export default PublicationTable;
