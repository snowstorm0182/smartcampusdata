/*import {
  LOAD_PUBLICATIONS,
  ADD_PUBLICATION,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
  LOAD_LABELS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
} from '../constants';

import

export default function (state, { type, payload }) {
  debugger;
  switch (type) {
    // PUBLICATIONS
    case LOAD_PUBLICATIONS: return { publications: payload };
    case ADD_PUBLICATION: return { publications: [...state.publications, payload] };
    case UPDATE_PUBLICATION: {
      const publicationToUpdate = state.publications.find((publication) => publication.id === payload.id);
      return { publications: [
        ...state.publications.filter((publication) => publication.id !== payload.id),
        Object.assign({}, publicationToUpdate, { done: payload.done }),
      ] };
    }
    case DELETE_PUBLICATION: return { publications: state.publications.filter((publication) => publication.id !== payload) };

    // LABELS
    case LOAD_LABELS: return { labels: payload };
    case ADD_LABEL: return { labels: [...state.labels, payload] };
    case UPDATE_LABEL: {
      const labelToUpdate = state.labels.find((label) => label.id === payload.id);
      return { labels: [
        ...state.labels.filter((label) => label.id !== payload.id),
        Object.assign({}, labelToUpdate, { done: payload.done }),
      ] };
    }
    case DELETE_LABEL: return { labels: state.labels.filter((label) => label.id !== payload) };
    default: return state;
  }
}*/

import { combineReducers } from 'redux'
import publications from './publications'
import labels from './labels'

export default combineReducers({
  publications,
  labels
})
