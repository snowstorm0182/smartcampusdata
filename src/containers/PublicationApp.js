import { connect } from 'react-redux';

import PublicationApp from '../components/PublicationApp';

import {
  addPublication,
  updatePublication,
  updatePublicationTitle,
  updatePublicationTags,
  updatePublicationNotes,
  deletePublication,
} from '../actions';

function mapStateToProps(state) {
  const { publications, labels } = state;
  return {
    publications,
    labels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddPublication(title) {
      dispatch(addPublication(title));
    },
    handleDeletePublication(id) {
      dispatch(deletePublication(id));
    },
    handleUpdatePublication(id, done) {
      dispatch(updatePublication(id, done));
    },
    handleUpdatePublicationTitle(id, title) {
      dispatch(updatePublicationTitle(id, title));
    },
    handleUpdatePublicationTags(id, tags) {
      dispatch(updatePublicationTags(id, tags));
    },
    handleUpdatePublicationNotes(id, notes) {
      dispatch(updatePublicationNotes(id, notes));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicationApp);
