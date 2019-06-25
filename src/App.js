import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Hello from './components/StatefulHello';

// PUBLICATIONS
import PublicationApp from './containers/PublicationApp';
import PublicationTableApp from './containers/PublicationTableApp';

import {loadPublications} from './actions';
import store from './store';
import {LOAD_PUBLICATIONS, FILTERS} from './constants';

store.dispatch(loadPublications(LOAD_PUBLICATIONS));

// LABELS
import LabelApp from './containers/LabelApp';

import {loadLabels} from './actions';
import {LOAD_LABELS} from './constants';

store.dispatch(loadLabels(LOAD_LABELS));

// QUOTES
import QuoteApp from './containers/QuoteApp';
import NodeApp from './containers/NodeApp';
import SectionPreviewApp from './containers/SectionPreviewApp';

import {loadNodes} from './actions';
import {LOAD_QUOTES, LOAD_NODES} from './constants';

store.dispatch(loadNodes(LOAD_QUOTES));
store.dispatch(loadNodes('FORUMS'));
store.dispatch(loadNodes('TODOS'));
store.dispatch(loadNodes('SECTIONS'));

import logo from './logo.svg';

import Dexie from 'dexie';
import db from './db';
import {exportDbData} from './actions';
import {importDbData} from './actions';
import {appendQuotes} from './actions';

import { saveAs } from 'file-saver';
import { format } from 'date-fns'

function exportFunc() {
  (async ()=>{
      const allData = await exportDbData (db);
      const serialized = JSON.stringify(allData);
      var blob = new Blob([serialized], {type: "text/plain;charset=utf-8"});
      var stamp = format(new Date(), "YYYYMMDD-HHmm")
      saveAs(blob, "data-"+stamp+".json");
  })()
}

function importFunc(data) {
  (async ()=>{
    const jsonToImport = data;
    const dataToImport = JSON.parse(jsonToImport);
    await importDbData(dataToImport, db);
  })();
}

function importQuotesFunc(data) {
  (async ()=>{
    const dataToImport = JSON.parse(data);
    await appendQuotes(dataToImport, db);
  })().then(window.location.reload(false));
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      filters: ['imported','exluded','forums'],
      showpreview: false,
      showpublications: false,
      showpublicationstable: false,
      showlabels: false,
      showquotes: false,
      showtools: false,
    }
  }
  filters = FILTERS
  handleFilterChange(k) {
    var tmpfilters = [...this.state.filters];
    var index = tmpfilters.indexOf(k);
    if (index === -1) {
        tmpfilters.push(k);
    } else {
        tmpfilters.splice(index, 1);
    }
    this.setState({filters: tmpfilters});
  }

  _import(data) {
    importFunc(data);
  }
  _import_quotes(data) {
    importQuotesFunc(data);
  }
  _export(data) {
    exportFunc(data);
  }

  fileReader = null;

  handleFileRead = (e) => {
      const content = this.fileReader.result;
      this._import(content);
      //console.log(content);
      // … do something with the 'content' …
  }
  handleFileChosen = (file) => {
      this.fileReader = new FileReader();
      this.fileReader.onloadend = this.handleFileRead;
      this.fileReader.readAsText(file);
  }

  render() {
    return (
      <div className="App" style={{marginBottom : '1em'}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Publications review App</h1>
        </header>
        <div style={{transform: 'translateY(-2em)',color: 'white',height: '0',}}>
          views:<button
            style={{
              color : !this.state.showpreview ? 'gray':'black',
            }}
            key='showpreview' onClick={(e) => this.setState({showpreview: !this.state.showpreview})}>preview</button>
          <button
            style={{
              color : !this.state.showpublications ? 'gray':'black',
            }}
            key='showpublications' onClick={(e) => this.setState({showpublications: !this.state.showpublications})}>publications</button>
          <button
            style={{
              color : !this.state.showpublicationstable ? 'gray':'black',
            }}
            key='showpublicationstable' onClick={(e) => this.setState({showpublicationstable: !this.state.showpublicationstable})}>table</button>
          <button
            style={{
              color : !this.state.showlabels ? 'gray':'black',
            }}
            key='showlabels' onClick={(e) => this.setState({showlabels: !this.state.showlabels})}>labels</button>
          <button
            style={{
              color : !this.state.showquotes ? 'gray':'black',
            }}
            key='showquotes' onClick={(e) => this.setState({showquotes: !this.state.showquotes})}>quotes</button>
          <button
            style={{
              color : !this.state.showtools ? 'gray':'black',
            }}
            key='showtools' onClick={(e) => this.setState({showtools: !this.state.showtools})}>tools</button>
          &nbsp;
          expose:
          {this.filters.filter((i) => (i !== '')).map((i) => (<button
            style={{
              color : this.state.filters.includes(i) ? 'gray':'black',
            }}
            key={i} onClick={(e) => this.handleFilterChange(i)}>{i}</button>))}
        </div>
        <Provider store={store}>
          {this.state.showpublicationstable ? (<PublicationTableApp filters={this.state.filters} />):(
          <div id="layout">
            <div id="left" className="column">
              <div className="top-left"></div>
              <div className="bottom">
                <NodeApp />
              </div>
            </div>
            <div id="right" className="column">
              <div className="top-right">
                {this.state.showtools ? (
                  <div style={{margin:'1em'}}>
                    <label>Import/export </label>
                    <input type='file'
                           id='file'
                           className='input-file'
                           accept='.json'
                           onChange={e => this.handleFileChosen(e.target.files[0])}
                    />
                    <textarea onChange={(e) => this._import(e.target.value)} />
                    <button onClick={(e) => this._export()}>Export</button>
                    <div>
                      <label>Import quotes</label>
                      <textarea onChange={(e) => this._import_quotes(e.target.value)} />
                    </div>
                  </div>
                ):null}
              </div>
              <div className="bottom">
                {this.state.showpreview ? (<SectionPreviewApp />):null}
                {this.state.showpublications ? (<PublicationApp filters={this.state.filters} />):null}
                {this.state.showlabels ? (<LabelApp />):null}
                {this.state.showquotes ? (<QuoteApp />):null}
              </div>
            </div>
          </div>
          )}
        </Provider>
      </div>
    );
  }
}

export default App;
