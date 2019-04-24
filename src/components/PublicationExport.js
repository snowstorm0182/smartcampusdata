import * as React from 'react';
import * as PropTypes from 'prop-types';

import Publication from './Publication';

class PublicationExport extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    table: false,
    tableformat: 'table',
    sources:false,
    citations: false,
    references: [],
    showStates: [],
    apaset: 0,
  };

  filteredPublications = () => {
    return this.props.publications.filter((i) => (!this.props.filters.includes(i.state)))
  }

  assignState = (k, v) => {
    this.setState(prevState => ({
      [k]: v,
    }));
  }

  onToggle = (e, name) => {
    this.setState(prevState => ({
      [name]: !prevState[name],
    }));
  }

  updateReferences = (e) => {
    this.setState(prevState => ({
      references: [],
    }));

    var self = this;

    this.filteredPublications()
    .filter((i) => (i.apa))
    .map((i) => (
      self.setState(prevState => ({
        references: [...prevState.references, i.apa],
      }))
    ));

    const fetchReferences = p => fetch('https://dx.doi.org/' + encodeURIComponent(p.doi),{
      headers: {"Accept": "text/bibliography; style=apa; locale=fi-FI",}
    })
    .then(res => res.text())
    .then(ref => (p.apa = ref))
    .then(() => (
     self.setState(prevState => ({
       references: [...prevState.references, p.apa],
     }))
    )).then(() => {
      this.props.handleUpdatePublicationField(p.id, {apa: p.apa})
    });

    Promise
    .all(
      this.filteredPublications()
      .filter((i) => (!i.apa))
      .slice(0,50) // crossref limit
      .map(fetchReferences)
    )
  }

  notify(msg,duration){
   var alt = document.createElement("div");
       alt.setAttribute("style","position:fixed;top:10%;left:50%;transform: translateX(-50%);background-color:white;padding:1em;border:1px solid black;");
       alt.innerHTML = msg;
       setTimeout(function(){
        alt.parentNode.removeChild(alt);
       },duration);
       document.body.appendChild(alt);
  }

  render = () => { return (
    <div>
    <h2>Article outlines</h2>
    <label name='table' onClick={(e) => this.onToggle(e, e.target.getAttribute('name'))}>Show articles<input type='checkbox' checked={this.state.table} disabled/></label>
    <label name='sources' onClick={(e) => this.onToggle(e, e.target.getAttribute('name'))}>Show publications<input type='checkbox' checked={this.state.sources} disabled/></label>
    <div>
      {(this.state.tableformat == 'table' ? (
        <table style={{paddingLeft : '0', display : this.state.table ? 'table' : 'none'}}>
          <thead><tr>
            <th colSpan="4">
              Articles&nbsp;
              <button onClick={(e) => this.assignState('tableformat', 'apa')}>apa</button>
            </th>
          </tr></thead><tbody>
          {this.filteredPublications().map((publication) => <tr
            key={publication.id}>
            <td>{publication.id}</td>
            <td>{publication.title.trim()}</td>
            <td>{publication.crossref['container-title'][0].trim()}</td>
            <td><a target='_blank' href={'https://dx.doi.org/'+publication.doi.trim()}>{publication.doi.trim()}</a></td>
            </tr>)}</tbody>
        </table>
      ):(
        <table style={{paddingLeft : '0', display : this.state.table ? 'table' : 'none'}}>
          <thead><tr>
            <th>
              Articles&nbsp;
              <button onClick={(e) => this.assignState('tableformat', 'table')}>table</button>
              {this.state.references.length !== this.filteredPublications().length ?
                (<button onClick={(e) => this.updateReferences()}>
                  update { this.state.references.length + '/' + this.filteredPublications().length }
                </button>):null}
              {(<button onClick={(e) => {
                  (typeof navigator.clipboard.writeText === "undefined" || !navigator.clipboard) ?
                    (e) => (
                        document.getElementById('apatextbody').focus()
                        || document.getElementById('apatextbody').select()
                        || document.execCommand('copy')
                    )
                  :
                    navigator.clipboard.writeText(this.state.references.sort().join("")).then((self = this) => {
                      self.notify('Async: Copying to clipboard was successful!', 2000);
                    })}
                }>
                  copy
                </button>)}
            </th>
          </tr></thead><tbody><tr><td>
          <textarea id='apatextbody' tabIndex="-1" readOnly rows="10" style={{width:'100%'}}
          value={this.state.references.map((line,idx) => line).join("")}
          />
            </td></tr></tbody>
        </table>
      )
    )}
    </div>

    <table style={{paddingLeft : '0', display : this.state.sources ? 'table' : 'none'}}>
      <thead><tr>
        <th colSpan="1">Publications</th>
      </tr></thead><tbody>
      {
        [...new Set(this.filteredPublications().map(item => item.crossref['container-title'][0]))]
        .map((publication) => <tr
        key={publication}>
        <td>{publication}</td>
        </tr>)}</tbody>
    </table>
    </div>
  );}
}

PublicationExport.propTypes = {
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

export default PublicationExport;
