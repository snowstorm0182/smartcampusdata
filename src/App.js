import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Hello from './components/StatefulHello';

// PUBLICATIONS
import PublicationApp from './containers/PublicationApp';

import {loadPublications} from './actions';
import store from './store';
import {LOAD_PUBLICATIONS} from './constants';

store.dispatch(loadPublications(LOAD_PUBLICATIONS));

// LABELS
import LabelApp from './containers/LabelApp';

import {loadLabels} from './actions';
import {LOAD_LABELS} from './constants';

store.dispatch(loadLabels(LOAD_LABELS));

// QUOTES
import QuoteApp from './containers/QuoteApp';

import {loadQuotes} from './actions';
import {LOAD_QUOTES} from './constants';

store.dispatch(loadQuotes(LOAD_QUOTES));

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
    this.state = {filters: ['imported','exluded']}
  }
  filters = ['imported', 'exluded']
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

  render() {
    return (
      <div className="App" style={{marginBottom : '1em'}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Publications review App</h1>
        </header>
        <div>
          {this.filters.map((i) => (<button
            style={{
              color : this.state.filters.includes(i) ? 'gray':'black',
            }}
            key={i} onClick={(e) => this.handleFilterChange(i)}>{i}</button>))}
        </div>
        <Provider store={store}>
          <PublicationApp filters={this.state.filters} />
          <LabelApp />
          <QuoteApp />
        </Provider>
        <div style={{display : 'none'}}>
          <Hello name="TypeScript" enthusiasmLevel={10} />
        </div>
        <label>Import/export </label>
        <textarea onChange={(e) => this._import(e.target.value)} />
        <button onClick={(e) => this._export()}>Export</button>
        <div>
          <label>Import quotes</label>
          <textarea onChange={(e) => this._import_quotes(e.target.value)} />
        </div>
      </div>
    );
  }
}

export default App;
