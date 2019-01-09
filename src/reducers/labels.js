import {
  LOAD_LABELS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
} from '../constants';

export default function labels(state = [], { type, payload }) {
  switch (type) {
    // LABELS
    case LOAD_LABELS: return payload;
    case ADD_LABEL: return [...state, payload];
    case UPDATE_LABEL: {
      const labelToUpdate = state.find((label) => label.id === payload.id);
      return [
        ...state.filter((label) => label.id !== payload.id),
        Object.assign({}, labelToUpdate, { title: payload.title }),
      ];
    }
    case DELETE_LABEL: return state.filter((label) => label.id !== payload);
    default: return state;
  }
}
