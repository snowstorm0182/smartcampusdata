import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
//import {parseBibFile} from "bibtex";
import bibtexParse from 'bibtex-parse-js';

class AddPublication extends Component<any, any> {
    static propTypes = {
      handleAddPublication: PropTypes.func.isRequired,
    };

  constructor(props: any) {
    super(props);
    this.state = {title: '', code:'', doi:'', bibtex:'', crossref:{}};
    this.addPublication = this.addPublication.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addPublication() {
    this.props.handleAddPublication(this.state);
  }

  handleChange(newValue: any) {
    this.setState({value: newValue});
  }

  handleChangeEvent (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    //https://www.crosscite.org/format?doi=10.1145%2F2783446.2783605&style=bibtex&lang=en-US
  }

  doiImport () {
    this._handleCrossRef(this.state.doi);
    this._handleCrossCite(this.state.doi)
  }

  _handleCrossRef(doi){
    fetch('https://api.crossref.org/works/'+doi)
      .then(result=>result.json())
      .then(items=>{
        this.setState({crossref: items.message});
        if(items.message.abstract) {
          this.setState({abstract: items.message.abstract});
        }
        this.setState({title: items.message.title[0]});
      })
  }

  _handleCrossCite(doi){
    fetch('https://www.crosscite.org/format?doi=/' + encodeURIComponent(doi) + '&style=bibtex&lang=en-US')
      .then(result=>result.text())
      .then(text=>{
        //console.log(text);
        this.setState({bibtex: text});
        let parsedbib = bibtexParse.toJSON(text);
        this.setState({code: parsedbib[0]['citationKey']});
        //console.log(parsedbib);
      })
  }

  render() {
    return (<div>
      <label>Title:
      <input name="title" type="text" value={this.state.title} onChange={(e) => this.handleChangeEvent(e)} /></label>
      <label>Code:
      <input name="code" type="text" value={this.state.code} onChange={(e) => this.handleChangeEvent(e)} /></label>
      <label>Doi:
      <input name="doi" type="text" value={this.state.doi} onChange={(e) => this.handleChangeEvent(e)} /></label>
      <button type="button" onClick={(e) => this.addPublication()}>Add Publication</button>
      <button type="button" onClick={(e) => this.doiImport()}>Import from Doi</button>
    </div>);
  }
}

export default AddPublication;
