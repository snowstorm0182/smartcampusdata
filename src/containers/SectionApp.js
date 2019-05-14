import { connect } from 'react-redux';

import SectionApp from '../components/SectionApp';

import {
  addNode,
  updateNode,
  deleteNode,
} from '../actions';

function mapStateToProps(state) {
  const { sections } = state;
  return {
    sections,
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
      //console.log(type);
      dispatch(updateNode(type, id, key, val));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionApp);
