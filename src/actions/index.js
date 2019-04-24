import {
  LOAD_PUBLICATIONS,
  ADD_PUBLICATION,
  UPDATE_PUBLICATION,
  UPDATE_PUBLICATION_TITLE,
  UPDATE_PUBLICATION_FIELD,
  UPDATE_PUBLICATION_EDIT,
  UPDATE_PUBLICATION_TAG,
  UPDATE_PUBLICATION_NOTES,
  DELETE_PUBLICATION,
  LOAD_LABELS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  LOAD_QUOTES,
  ADD_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
} from '../constants';
import db from '../db';

export function loadPublications(action) {
  return (dispatch) => {
    db.table('publications')
      .toArray()
      .then((publications) => {
        dispatch({
          type: LOAD_PUBLICATIONS,
          payload: publications,
        });
      });
  };
}

export function showPublicationAdd(value){
  return (dispatch) => {
    dispatch({
      type: 'foo',
      payload: value,
    });
  }
}

export function addPublication(publication) {
  return (dispatch) => {
    const publicationToAdd = publication;
    db.table('publications')
      .add(publicationToAdd)
      .then((id) => {
         dispatch({
           type: ADD_PUBLICATION,
           payload: Object.assign({}, publicationToAdd, { id }),
         });
      });
  }
}

export function deletePublication(id) {
  return (dispatch) => {
    db.table('publications')
      .delete(id)
      .then(() => {
        dispatch({
          type: DELETE_PUBLICATION,
          payload: id,
        });
      });
  };
}

export function updatePublication(id, done) {
  return (dispatch) => {
    db.table('publications')
      .update(id, { done })
      .then(() => {
        dispatch({
          type: UPDATE_PUBLICATION,
          payload: { id, done },
        });
      });
  };
}

export function updatePublicationTitle(id, title) {
  return (dispatch) => {
    db.table('publications')
      .update(id, { title })
      .then(() => {
        dispatch({
          type: UPDATE_PUBLICATION_TITLE,
          payload: { id, title },
        });
      });
  };
}

export function updatePublicationField(id, field) {
  return (dispatch) => {
    db.table('publications')
      .update(id, field)
      .then(() => {
        dispatch({
          type: UPDATE_PUBLICATION_FIELD,
          payload: { id, field },
        });
      });
  };
}

export function updatePublicationEdit(id, edit) {
  return (dispatch) => {
    db.table('publications')
      .update(id, { edit })
      .then(() => {
        dispatch({
          type: UPDATE_PUBLICATION_EDIT,
          payload: { id, edit },
        });
      });
  };
}

export function updatePublicationTags(id, tags) {
  return (dispatch) => {
    db.table('publications')
      .update(id, { tags })
      .then(() => {
        dispatch({
          type: UPDATE_PUBLICATION_TAG,
          payload: { id, tags },
        });
      });
  };
}

export function updatePublicationNotes(id, notes) {
  return (dispatch) => {
    db.table('publications')
      .update(id, { notes })
      .then(() => {
        dispatch({
          type: UPDATE_PUBLICATION_NOTES,
          payload: { id, notes },
        });
      });
  };
}

export function loadLabels(action) {
  return (dispatch) => {
    db.table('labels')
      .toArray()
      .then((labels) => {
        dispatch({
          type: LOAD_LABELS,
          payload: labels,
        });
      });
  };
}

export function addLabel(title) {
  return (dispatch) => {
    const labelToAdd = { title };
    db.table('labels')
      .add(labelToAdd)
      .then((id) => {
         dispatch({
           type: ADD_LABEL,
           payload: Object.assign({}, labelToAdd, { id }),
         });
      });
  }
}

export function deleteLabel(id) {
  return (dispatch) => {
    db.table('labels')
      .delete(id)
      .then(() => {
        dispatch({
          type: DELETE_LABEL,
          payload: id,
        });
      });
  };
}

export function updateLabel(id, title) {
  return (dispatch) => {
    db.table('labels')
      .update(id, { title })
      .then(() => {
        dispatch({
          type: UPDATE_LABEL,
          payload: { id, title },
        });
      });
  };
}

export function loadQuotes(action) {
  return (dispatch) => {
    db.table('quotes')
      .toArray()
      .then((quotes) => {
        dispatch({
          type: LOAD_QUOTES,
          payload: quotes,
        });
      });
  };
}

export function addQuote(text) {
  return (dispatch) => {
    const quoteToAdd = { text };
    db.table('quotes')
      .add(quoteToAdd)
      .then((id) => {
         dispatch({
           type: ADD_QUOTE,
           payload: Object.assign({}, quoteToAdd, { id }),
         });
      });
  }
}

export function deleteQuote(id) {
  return (dispatch) => {
    db.table('quotes')
      .delete(id)
      .then(() => {
        dispatch({
          type: DELETE_QUOTE,
          payload: id,
        });
      });
  };
}

export function updateQuote(id, key, val) {
  return (dispatch) => {
    db.table('quotes')
      .update(id, { [key]: val })
      .then(() => {
        dispatch({
          type: UPDATE_QUOTE,
          payload: { id, key: key, val: val },
        });
      });
  };
}

export function loadAll(action) {
  return (dispatch) => {
    db.table('labels')
      .toArray()
      .then((labels) => {
        dispatch({
          type: LOAD_LABELS,
          payload: labels,
        });
      });
  };
}

interface TableDump {
    table: string,
    rows: any[]
}

export function exportDbData(db: Dexie): TableDump[] {
    return db.transaction('r', db.tables, ()=>{
        return Promise.all(
            db.tables.map(table => table.toArray()
                .then(rows => ({table: table.name, rows: rows}))));
    });
}

export function importDbData(data: TableDump[], db: Dexie) {
    return db.transaction('rw', db.tables, () => {
        return Promise.all(data.map (t =>
              db.table(t.table).clear()
              .then(()=>db.table(t.table).bulkAdd(t.rows))
            )
        )
        .then(setTimeout(()=>{window.location.reload(false)},4000));
    });
}

export function appendQuotes(data: TableDump[], db: Dexie) {
    /**
    * json sample id is publicationId
    {"id": 1, "quotes": [
      {"text": "fooo", "type": "terms"},
      {"text": "bar", "type": ""}
    ]}
    */
    var ldone = [];
    return db.transaction('rw', db.tables, () => {
        return Promise.all(data.quotes.map (t => {
          t.publicationId = data.id;
          if (t.labels) {
            [...new Set(t.labels)].map (l => {
              db.table('labels').where('title').equals(l).count().then(function (r){
                if (!r && !ldone.includes(l)) {
                  ldone.push(l);
                  db.table('labels').add({'title':l});
                }
              });
            });
          }
          return db.table('quotes').add(t)
        }));
    });
}
