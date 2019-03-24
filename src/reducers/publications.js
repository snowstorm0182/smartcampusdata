import {
  LOAD_PUBLICATIONS,
  ADD_PUBLICATION,
  UPDATE_PUBLICATION,
  UPDATE_PUBLICATION_TITLE,
  UPDATE_PUBLICATION_EDIT,
  UPDATE_PUBLICATION_TAG,
  UPDATE_PUBLICATION_NOTES,
  DELETE_PUBLICATION,
} from '../constants';

export default function publications(state = [], { type, payload }) {
  switch (type) {
    case LOAD_PUBLICATIONS: return payload;
    case ADD_PUBLICATION: return [...state, payload];
    case UPDATE_PUBLICATION: {
      const publicationToUpdate = state.find((publication) => publication.id === payload.id);
      return [
        ...state.filter((publication) => publication.id !== payload.id),
        Object.assign({}, publicationToUpdate, { done: payload.done }),
      ];
    }
    case UPDATE_PUBLICATION_TITLE: {
      const publicationToUpdate = state.find((publication) => publication.id === payload.id);
      return [
        ...state.filter((publication) => publication.id !== payload.id),
        Object.assign({}, publicationToUpdate, { title: payload.title }),
      ];
    }
    case UPDATE_PUBLICATION_EDIT: {
      const publicationToUpdate = state.find((publication) => publication.id === payload.id);
      return [
        ...state.filter((publication) => publication.id !== payload.id),
        Object.assign({}, publicationToUpdate, { edit: payload.edit }),
      ];
    }
    case UPDATE_PUBLICATION_TAG: {
      const publicationToUpdate = state.find((publication) => publication.id === payload.id);
      return [
        ...state.filter((publication) => publication.id !== payload.id),
        Object.assign({}, publicationToUpdate, { tags: payload.tags }),
      ];
    }
    case UPDATE_PUBLICATION_NOTES: {
      const publicationToUpdate = state.find((publication) => publication.id === payload.id);
      return [
        ...state.filter((publication) => publication.id !== payload.id),
        Object.assign({}, publicationToUpdate, { notes: payload.notes }),
      ];
    }
    case DELETE_PUBLICATION: return state.filter((publication) => publication.id !== payload);
    default: return state;
  }
}
