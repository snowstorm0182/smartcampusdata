import {
  LOAD_QUOTES,
  ADD_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
} from '../constants';

export default function quotes(state = [], { type, payload }) {
  switch (type) {
    // QUOTES
    case LOAD_QUOTES: return payload;
    case ADD_QUOTE: return [...state, payload];
    case UPDATE_QUOTE: {
      debugger;
      const quoteToUpdate = state.find((quote) => quote.id === payload.id);
      return [
        ...state.filter((quote) => quote.id !== payload.id),
        Object.assign({}, quoteToUpdate, { [payload.key]: payload.val }),
      ];
    }
    case DELETE_QUOTE: return state.filter((quote) => quote.id !== payload);
    default: return state;
  }
}
