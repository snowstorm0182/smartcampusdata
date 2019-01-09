import { connect } from 'react-redux';

import LabelApp from '../components/LabelApp';

import {
  addLabel,
  updateLabel,
  deleteLabel,
} from '../actions';

function mapStateToProps(state) {
  const { labels } = state;
  return {
    labels,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddLabel(title) {
      dispatch(addLabel(title));
    },
    handleDeleteLabel(id) {
      dispatch(deleteLabel(id));
    },
    handleUpdateLabel(id, title) {
      dispatch(updateLabel(id, title));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LabelApp);
