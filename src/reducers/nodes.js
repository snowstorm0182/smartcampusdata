import {
  LOAD_NODES,
  ADD_NODE,
  UPDATE_NODE,
  DELETE_NODE,
} from '../constants';

export default function nodes(state = [], { type, payload }, reducerName = '') {

  switch (type) {
    // NODES
    case LOAD_NODES:
    case 'FORUMS':
    case 'SECTIONS':
    case 'TODOS': return payload;
    case ADD_NODE: return [...state, payload];
    case UPDATE_NODE: {
      const nodeToUpdate = state.find((node) => node.id === payload.id);
      return [
        ...state.map(q => {
          if(q.id == payload.id)
            return Object.assign({}, nodeToUpdate, { [payload.key]: payload.val });
          return q;
        })
      ];
    }
    case DELETE_NODE: return state.filter((node) => node.id !== payload);
    default: return state;
  }
}
