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
  })().then(window.location.reload(false)); // 1
}

class App extends React.Component {
  _import(data) {
    importFunc(data);
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
        <Provider store={store}>
          <PublicationApp />
          <LabelApp />
          <QuoteApp />
        </Provider>
        <Hello name="TypeScript" enthusiasmLevel={10} />
        <label>Import/export </label>
        <textarea onChange={(e) => this._import(e.target.value)} />
        <button onClick={(e) => this._export()}>Export</button>
      </div>
    );
  }
}

export default App;
