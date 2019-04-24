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
      const iOrg = state.find((publication) => publication.id === payload.id);
      return [
        ...state.map(i => {
          if(i.id == payload.id)
            return Object.assign({}, iOrg, { title: payload.title });
          return i;
        })
      ];
    }
    case UPDATE_PUBLICATION_FIELD: {
      const iOrg = state.find((publication) => publication.id === payload.id);
      return [
        ...state.map(i => {
          if(i.id == payload.id)
            return Object.assign({}, iOrg, payload.field);
          return i;
        })
      ];
    }
    case UPDATE_PUBLICATION_EDIT: {
      const iOrg = state.find((publication) => publication.id === payload.id);
      return [
        ...state.map(i => {
          if(i.id == payload.id)
            return Object.assign({}, iOrg, { edit: payload.edit });
          return i;
        })
      ];
    }
    case UPDATE_PUBLICATION_TAG: {
      const iOrg = state.find((publication) => publication.id === payload.id);
      return [
        ...state.map(i => {
          if(i.id == payload.id)
            return Object.assign({}, iOrg, { tags: payload.tags });
          return i;
        })
      ];
    }
    case UPDATE_PUBLICATION_NOTES: {
      const iOrg = state.find((publication) => publication.id === payload.id);
      return [
        ...state.map(i => {
          if(i.id == payload.id)
            return Object.assign({}, iOrg, { notes: payload.notes });
          return i;
        })
      ];
    }
    case DELETE_PUBLICATION: return state.filter((publication) => publication.id !== payload);
    default: return state;
  }
}
