import { connect } from 'react-redux';

import NodeApp from '../components/NodeApp';

import {
  addNode,
  updateNode,
  deleteNode,
} from '../actions';

function mapStateToProps(state) {
  const { forums, todos } = state;
  return {
    forums, todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddNode(type, node) {
      dispatch(addNode(type, node));
    },
    handleDeleteNode(type, id) {
      dispatch(deleteNode(type, id));
    },
    handleUpdateNode(type, id, key, val) {
      console.log(type);
      dispatch(updateNode(type, id, key, val));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeApp);
